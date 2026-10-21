const crypto = require("crypto");
const fs = require("fs");
const https = require("https");
const path = require("path");
const { once } = require("events");

const projectRoot = path.join(__dirname, "..");
const imagesDirectory = path.join(projectRoot, "images");
const imageExtensions = new Set([
  ".avif",
  ".bmp",
  ".gif",
  ".heic",
  ".jpeg",
  ".jpg",
  ".png",
  ".tif",
  ".tiff",
  ".webp",
]);
const uploadConcurrency = 4;
const cloudinaryFolder = "images";

const loadEnvFile = () => {
  let contents;
  try {
    contents = fs.readFileSync(path.join(projectRoot, ".env"), "utf8");
  } catch (error) {
    if (error.code === "ENOENT") {
      return;
    }
    throw error;
  }

  for (const line of contents.split(/\r?\n/)) {
    const match = line.match(/^\s*(?:export\s+)?([\w.-]+)\s*=\s*(.*?)\s*$/);
    if (!match || Object.hasOwn(process.env, match[1])) {
      continue;
    }

    let value = match[2];
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'")) ||
      (value.startsWith("`") && value.endsWith("`"))
    ) {
      value = value.slice(1, -1);
    } else {
      value = value.replace(/\s+#.*$/, "");
    }
    process.env[match[1]] = value;
  }
};

loadEnvFile();

const getFirstValue = (...values) =>
  values.find((value) => typeof value === "string" && value.trim())?.trim();

const getCloudinaryConfig = () => {
  let cloudName = getFirstValue(
    process.env.CLOUDINARY_NAME,
    process.env.CLOUDNARY_NAME
  );

  if (!cloudName && process.env.FILES_STORAGE_URL) {
    const storageUrl = new URL(process.env.FILES_STORAGE_URL);
    if (storageUrl.hostname === "res.cloudinary.com") {
      cloudName = storageUrl.pathname.split("/").filter(Boolean)[0];
    }
  }

  const config = {
    cloudName,
    apiKey: getFirstValue(
      process.env.CLOUDINARY_API_KEY,
      process.env.CLOUDNARY_API_KEY
    ),
    apiSecret: getFirstValue(
      process.env.CLOUDINARY_API_SECRET,
      process.env.CLOUDNARY_API_SECRET
    ),
    folder: cloudinaryFolder,
  };

  const missing = [
    ["Cloudinary cloud name", config.cloudName],
    ["Cloudinary API key", config.apiKey],
    ["Cloudinary API secret", config.apiSecret],
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missing.length) {
    throw new Error(
      `Missing ${missing.join(", ")}. Set them in .env or the environment.`
    );
  }

  return config;
};

const findImages = async (directory) => {
  const entries = await fs.promises.readdir(directory, {
    withFileTypes: true,
  });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findImages(entryPath)));
    } else if (
      entry.isFile() &&
      imageExtensions.has(path.extname(entry.name).toLowerCase())
    ) {
      files.push(entryPath);
    }
  }

  return files;
};

const createSignature = (params, apiSecret) => {
  const serializedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  return crypto
    .createHash("sha1")
    .update(`${serializedParams}${apiSecret}`)
    .digest("hex");
};

const getPublicId = (filePath) => {
  return path.basename(filePath, path.extname(filePath)).trim();
};

const uploadImage = async (filePath, config) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const params = {
    folder: config.folder,
    overwrite: "true",
    public_id: getPublicId(filePath),
    timestamp,
  };
  const signature = createSignature(params, config.apiSecret);
  const boundary = `----KayanUpload${crypto.randomBytes(12).toString("hex")}`;
  const fields = {
    ...params,
    api_key: config.apiKey,
    signature,
  };
  const fieldParts = Object.entries(fields).map(([key, value]) =>
    Buffer.from(
      `--${boundary}\r\nContent-Disposition: form-data; name="${key}"\r\n\r\n${value}\r\n`
    )
  );
  const filename = path.basename(filePath).replace(/["\r\n]/g, "_");
  const fileHeader = Buffer.from(
    `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${filename}"\r\nContent-Type: application/octet-stream\r\n\r\n`
  );
  const ending = Buffer.from(`\r\n--${boundary}--\r\n`);
  const fileSize = (await fs.promises.stat(filePath)).size;
  const bodyLength =
    fieldParts.reduce((total, part) => total + part.length, 0) +
    fileHeader.length +
    fileSize +
    ending.length;

  return new Promise((resolve, reject) => {
    const request = https.request(
      {
        hostname: "api.cloudinary.com",
        path: `/v1_1/${encodeURIComponent(config.cloudName)}/image/upload`,
        method: "POST",
        headers: {
          "Content-Length": bodyLength,
          "Content-Type": `multipart/form-data; boundary=${boundary}`,
        },
      },
      (response) => {
        const chunks = [];
        response.on("data", (chunk) => chunks.push(chunk));
        response.on("error", reject);
        response.on("end", () => {
          const responseBody = Buffer.concat(chunks).toString("utf8");
          let result;

          try {
            result = JSON.parse(responseBody);
          } catch {
            reject(new Error("Cloudinary returned an invalid response."));
            return;
          }

          if (response.statusCode < 200 || response.statusCode >= 300) {
            reject(
              new Error(result.error?.message || "Cloudinary upload failed.")
            );
            return;
          }

          if (!result.secure_url) {
            reject(
              new Error("Cloudinary response did not include the image URL.")
            );
            return;
          }

          resolve(result.secure_url);
        });
      }
    );

    request.on("error", reject);

    (async () => {
      try {
        for (const part of fieldParts) {
          if (!request.write(part)) {
            await once(request, "drain");
          }
        }
        if (!request.write(fileHeader)) {
          await once(request, "drain");
        }

        for await (const chunk of fs.createReadStream(filePath)) {
          if (!request.write(chunk)) {
            await once(request, "drain");
          }
        }

        request.end(ending);
      } catch (error) {
        request.destroy(error);
      }
    })();
  });
};

const main = async () => {
  const args = process.argv.slice(2);
  const fileArgs = [];
  let dryRun = false;
  let showHelp = false;

  for (let index = 0; index < args.length; index++) {
    if (args[index] === "--dry-run") {
      dryRun = true;
    } else if (args[index] === "--help") {
      showHelp = true;
    } else if (args[index] === "--file" && args[index + 1]) {
      fileArgs.push(args[++index]);
    } else {
      throw new Error(
        "Usage: node scripts/upload-images-to-cloudinary.js [--dry-run] [--file <image-path> ...]"
      );
    }
  }

  if (showHelp) {
    console.log(
      "Usage: node scripts/upload-images-to-cloudinary.js [--dry-run] [--file <image-path> ...]\n" +
        "Uploads supported image files under ./images to the Cloudinary folder " +
        "images, preserving their filenames. Repeat --file to upload specific images."
    );
    return;
  }

  let files;
  if (fileArgs.length) {
    files = fileArgs.map((fileArg) => {
      const filePath = path.resolve(imagesDirectory, fileArg);
      const relativePath = path.relative(imagesDirectory, filePath);
      if (
        !relativePath ||
        relativePath === ".." ||
        relativePath.startsWith(`..${path.sep}`) ||
        path.isAbsolute(relativePath)
      ) {
        throw new Error(`Image path must be inside images: ${fileArg}`);
      }
      return filePath;
    });

    for (const filePath of files) {
      const stats = await fs.promises.stat(filePath);
      if (
        !stats.isFile() ||
        !imageExtensions.has(path.extname(filePath).toLowerCase())
      ) {
        throw new Error(`Not a supported image file: ${filePath}`);
      }
    }
  } else {
    files = await findImages(imagesDirectory);
  }
  files.sort();

  if (!files.length) {
    throw new Error(`No supported image files found in ${imagesDirectory}.`);
  }

  if (dryRun) {
    console.log(
      `Found ${files.length} image(s); destination folder: ${cloudinaryFolder}`
    );
    for (const filePath of files) {
      console.log(path.relative(projectRoot, filePath));
    }
    return;
  }

  const config = getCloudinaryConfig();
  let nextIndex = 0;
  const failures = [];

  const worker = async () => {
    while (nextIndex < files.length) {
      const index = nextIndex++;
      const filePath = files[index];

      try {
        const url = await uploadImage(filePath, config);
        console.log(
          `[${index + 1}/${files.length}] Uploaded ${path.relative(
            projectRoot,
            filePath
          )}: ${url}`
        );
      } catch (error) {
        failures.push({ filePath, error });
        console.error(
          `[${index + 1}/${files.length}] Failed ${path.relative(
            projectRoot,
            filePath
          )}: ${error.message}`
        );
      }
    }
  };

  await Promise.all(
    Array.from(
      { length: Math.min(uploadConcurrency, files.length) },
      () => worker()
    )
  );

  console.log(
    `Finished: ${files.length - failures.length} uploaded, ${failures.length} failed.`
  );
  if (failures.length) {
    process.exitCode = 1;
  }
};

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
