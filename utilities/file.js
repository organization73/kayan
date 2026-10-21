const fs = require("fs");
const path = require("path");
const https = require("https");
const crypto = require("crypto");
const { BlobServiceClient } = require("@azure/storage-blob");

// const deleteFile = (filePath) => {
//   return new Promise((resolve, reject) => {
//     fs.unlink(filePath, (err) => {
//       if (err) {
//         return reject(err);
//       }
//       resolve();
//     });
//   });
// };

// exports.deleteFile = deleteFile;

const azureStorageConfig = {
  accountName: process.env.ACCOUNT_NAME,
  sasToken: process.env.SAS_TOKEN,
  containerName: process.env.CONTAINER_NAME,
};

const AZURE_FILE_PATH = `https://${azureStorageConfig.accountName}.blob.core.windows.net/${azureStorageConfig.containerName}/`;

const blobServiceClient = new BlobServiceClient(
  `https://${azureStorageConfig.accountName}.blob.core.windows.net/?${azureStorageConfig.sasToken}`
);

const containerClient = blobServiceClient.getContainerClient(
  azureStorageConfig.containerName
);

const LOCAL_IMAGE_PATH = path.join(__dirname, "..", "images");
const CLOUDINARY_UPLOAD_FOLDER = "images";

const getCloudinaryConfig = () => {
  let cloudName =
    process.env.CLOUDINARY_NAME || process.env.CLOUDNARY_NAME;
  if (!cloudName && process.env.FILES_STORAGE_URL) {
    const url = new URL(process.env.FILES_STORAGE_URL);
    if (url.hostname === "res.cloudinary.com") {
      cloudName = url.pathname.split("/")[1];
    }
  }

  const config = {
    cloudName,
    apiKey: process.env.CLOUDINARY_API_KEY || process.env.CLOUDNARY_API_KEY,
    apiSecret:
      process.env.CLOUDINARY_API_SECRET || process.env.CLOUDNARY_API_SECRET,
  };

  if (!config.cloudName || !config.apiKey || !config.apiSecret) {
    throw new Error(
      "Cloudinary storage requires CLOUDNARY_NAME, CLOUDNARY_API_KEY, and CLOUDNARY_API_SECRET."
    );
  }

  return config;
};

const isCloudinaryStorage = () =>
  (process.env.STORAGE || "").trim().toUpperCase() === "CLOUDINARY";

const createCloudinarySignature = (params, apiSecret) => {
  const serializedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  return crypto
    .createHash("sha1")
    .update(`${serializedParams}${apiSecret}`)
    .digest("hex");
};

const sendCloudinaryRequest = (endpoint, body, contentType) =>
  new Promise((resolve, reject) => {
    const request = https.request(
      endpoint,
      {
        method: "POST",
        headers: {
          "Content-Type": contentType,
          "Content-Length": body.length,
        },
      },
      (response) => {
        const chunks = [];
        response.on("data", (chunk) => chunks.push(chunk));
        response.on("end", () => {
          const responseBody = Buffer.concat(chunks).toString("utf8");
          let result;
          try {
            result = JSON.parse(responseBody);
          } catch (error) {
            reject(new Error("Cloudinary returned an invalid response."));
            return;
          }

          if (response.statusCode < 200 || response.statusCode >= 300) {
            reject(
              new Error(
                result.error?.message || "Cloudinary request failed."
              )
            );
            return;
          }
          resolve(result);
        });
      }
    );

    request.on("error", reject);
    request.end(body);
  });

const uploadToCloudinary = async (file) => {
  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
  const timestamp = Math.floor(Date.now() / 1000);
  const basename = path.parse(path.basename(file.originalname)).name;
  const safeBasename = basename.replace(/[^\w-]/g, "-") || "image";
  const publicId = `${new Date()
    .toISOString()
    .replace(/:/g, "-")}-${crypto.randomBytes(4).toString("hex")}-${safeBasename}`;
  const params = {
    folder: CLOUDINARY_UPLOAD_FOLDER,
    public_id: publicId,
    timestamp,
  };
  const signature = createCloudinarySignature(params, apiSecret);
  const boundary = `----KayanUpload${crypto.randomBytes(12).toString("hex")}`;
  const fields = {
    ...params,
    api_key: apiKey,
    signature,
  };
  const parts = Object.entries(fields).map(
    ([key, value]) =>
      Buffer.from(
        `--${boundary}\r\nContent-Disposition: form-data; name="${key}"\r\n\r\n${value}\r\n`
      )
  );
  parts.push(
    Buffer.from(
      `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${path
        .basename(file.originalname)
        .replace(/["\r\n]/g, "_")}"\r\nContent-Type: ${
        file.mimetype || "application/octet-stream"
      }\r\n\r\n`
    ),
    file.buffer,
    Buffer.from(`\r\n--${boundary}--\r\n`)
  );

  const result = await sendCloudinaryRequest(
    `https://api.cloudinary.com/v1_1/${encodeURIComponent(
      cloudName
    )}/image/upload`,
    Buffer.concat(parts),
    `multipart/form-data; boundary=${boundary}`
  );

  if (!result.secure_url || !result.public_id) {
    throw new Error("Cloudinary upload response did not include the image URL.");
  }

  return result.secure_url;
};

const deleteFromCloudinary = async (imageUrl) => {
  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
  let publicId;

  if (/^https?:\/\//i.test(imageUrl)) {
    const url = new URL(imageUrl);
    if (url.hostname !== "res.cloudinary.com") {
      return false;
    }

    const pathParts = url.pathname.split("/").filter(Boolean);
    if (pathParts[0] !== cloudName) {
      throw new Error("Cannot delete a Cloudinary image from a different cloud.");
    }
    const uploadIndex = pathParts.indexOf("upload");
    if (uploadIndex === -1) {
      throw new Error("The Cloudinary image URL is not a supported upload URL.");
    }
    const assetParts = pathParts.slice(uploadIndex + 1);
    const versionIndex = assetParts.findIndex((part) => /^v\d+$/.test(part));
    if (versionIndex !== -1) {
      assetParts.splice(0, versionIndex + 1);
    }
    if (!assetParts.length) {
      throw new Error("Could not determine the Cloudinary image identifier.");
    }
    publicId = decodeURIComponent(assetParts.join("/"));
  } else {
    const normalizedPath = imageUrl.replace(/\\/g, "/").replace(/^\/+/, "");
    const pathParts = normalizedPath.split("/");
    if (
      pathParts.length < 2 ||
      pathParts[0] !== CLOUDINARY_UPLOAD_FOLDER ||
      pathParts.some((part) => !part || part === "." || part === "..")
    ) {
      throw new Error("Cannot determine the Cloudinary image identifier.");
    }
    publicId = pathParts.join("/");
  }

  publicId = publicId.replace(/\.[^.]+$/, "");
  if (!publicId) {
    throw new Error("Could not determine the Cloudinary image identifier.");
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const params = { public_id: publicId, timestamp };
  const fields = new URLSearchParams({
    ...params,
    api_key: apiKey,
    signature: createCloudinarySignature(params, apiSecret),
  });
  const body = Buffer.from(fields.toString());
  const result = await sendCloudinaryRequest(
    `https://api.cloudinary.com/v1_1/${encodeURIComponent(
      cloudName
    )}/image/destroy`,
    body,
    "application/x-www-form-urlencoded"
  );

  if (result.result !== "ok" && result.result !== "not found") {
    throw new Error(result.error?.message || "Cloudinary image deletion failed.");
  }
  return true;
};

exports.uploadImage = async (file) => {
  if (!file || !file.buffer) {
    throw new Error("No image file was provided.");
  }

  if (isCloudinaryStorage()) {
    return uploadToCloudinary(file);
  }

  if (!fs.existsSync(LOCAL_IMAGE_PATH)) {
    fs.mkdirSync(LOCAL_IMAGE_PATH, { recursive: true });
  }
  const filename = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}-${path
    .basename(file.originalname)
    .replace(/[^\w.-]/g, "-")}`;
  fs.writeFileSync(path.join(LOCAL_IMAGE_PATH, filename), file.buffer);
  return `images/${filename}`;
};

exports.deleteImage = async (imagePath) => {
  if (!imagePath) {
    return;
  }

  if (/^https?:\/\//i.test(imagePath)) {
    const url = new URL(imagePath);
    if (url.hostname === "res.cloudinary.com") {
      await deleteFromCloudinary(imagePath);
    }
    return;
  }

  if (
    isCloudinaryStorage() &&
    imagePath.replace(/\\/g, "/").replace(/^\/+/, "").startsWith(
      `${CLOUDINARY_UPLOAD_FOLDER}/`
    )
  ) {
    await deleteFromCloudinary(imagePath);
    return;
  }

  const resolvedPath = path.isAbsolute(imagePath)
    ? path.resolve(imagePath)
    : path.resolve(__dirname, "..", imagePath);
  const relativePath = path.relative(LOCAL_IMAGE_PATH, resolvedPath);
  if (
    relativePath &&
    !relativePath.startsWith(`..${path.sep}`) &&
    relativePath !== ".." &&
    fs.existsSync(resolvedPath)
  ) {
    fs.unlinkSync(resolvedPath);
  }
};

exports.uploadToAzure = async (req, res, next) => {
  try {
    if (!req.files) {
      return next(new Error("No files uploaded"));
    }

    const image = req.files["image"];
    const images = req.files["images"];

    if (image) {
      const blockBlobClient = containerClient.getBlockBlobClient(
        image[0].originalname
      );
      const result = await blockBlobClient.uploadData(
        image[0].buffer,
        image[0].size
      );
      console.log("result:", result);
    }

    if (images) {
      await Promise.all(
        images.map((file) => {
          const blockBlobClient = containerClient.getBlockBlobClient(
            file.originalname
          );
          return blockBlobClient.uploadData(file.buffer, file.size);
        })
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};

exports.uploadToAzureHandler = async (file) => {
  return new Promise(async (resolve, reject) => {
    if (!file) {
      return reject(new Error("No files uploaded"));
    }

    try {
      // Change the file name to a unique name
      file.originalname =
        new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname;
      file.path = AZURE_FILE_PATH + file.originalname;
      // Upload the file to Azure
      const blockBlobClient = containerClient.getBlockBlobClient(
        file.originalname
      );
      const result = await blockBlobClient.uploadData(file.buffer, file.size);
      console.log(result);
      resolve({
        message: "File uploaded successfully.",
        fileName: file.originalname,
        filePath: `https://${azureStorageConfig.accountName}.blob.core.windows.net/${azureStorageConfig.containerName}/${file.originalname}`,
      });
    } catch (error) {
      reject(error);
    }
  });
};

exports.deleteFromAzure = async (req, res, next) => {
  try {
    const fileName = req.params.fileName;
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    await blockBlobClient.delete();

    res.json({ message: "File deleted successfully." });
  } catch (error) {
    next(error);
  }
};

exports.deleteFromAzureHandler = (file) => {
  return new Promise(async (resolve, reject) => {
    try {
      const fileName = file.split("/").pop();
      console.log(file, "1is going to be deleted");
      console.log(fileName, "2is going to be deleted");

      const blockBlobClient = containerClient.getBlockBlobClient(fileName);
      await blockBlobClient.delete();

      resolve({ message: "File deleted successfully." });
    } catch (error) {
      console.error(error); // Log the error
      reject(new Error("Failed to delete file from Azure.")); // Reject with a new error
    }
  });
};

exports.listImagesInContainer = async () => {
  const { accountName, sasToken, containerName } = azureStorageConfig;

  // Construct the connection string
  const connectionString = `BlobEndpoint=https://${accountName}.blob.core.windows.net;SharedAccessSignature=${sasToken}`;

  try {
    // Create a BlobServiceClient
    const blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);

    // Get a reference to the container
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // List blobs in the container
    let imageUrls = [];
    for await (const blob of containerClient.listBlobsFlat()) {
      // Check if the blob is an image based on its extension
      if (/\.(jpg|jpeg|png|gif|bmp)$/i.test(blob.name)) {
        // Construct the URL for the blob
        const blobUrl = containerClient.getBlobClient(blob.name).url;
        const cleanUrl = blobUrl.split("?")[0].replace(/%20/g, " ");
        imageUrls.push(cleanUrl);
      }
    }

    return imageUrls;
  } catch (error) {
    if (
      error.statusCode === 403 &&
      error.details.errorCode === "AuthorizationResourceTypeMismatch"
    ) {
      throw new Error(
        "The SAS token does not have the required permissions to list blobs in this container."
      );
    } else {
      throw error;
    }
  }
};

exports.uploadToLocal = async (file) => {
  return new Promise((resolve, reject) => {
    try {
      if (!file) {
        throw new Error("No file provided");
      }

      if (!fs.existsSync(LOCAL_IMAGE_PATH)) {
        fs.mkdirSync(LOCAL_IMAGE_PATH, { recursive: true });
      }

      // Change the file name to a unique name
      file.originalname =
        new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname;
      const filePath = path.join(LOCAL_IMAGE_PATH, file.originalname);

      // Save the file locally
      fs.writeFileSync(filePath, file.buffer);

      resolve({
        message: "File saved locally.",
        fileName: file.originalname,
        filePath,
      });
    } catch (error) {
      reject(error);
    }
  });
};

exports.deleteLocalFile = (file) => {
  if (file && fs.existsSync(file.path)) {
    fs.unlinkSync(file.path);
  }
};
