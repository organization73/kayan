const path = require("path");

const CLOUDINARY_FOLDER = "images";
const IMAGE_EXTENSIONS = new Set([
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

const getCloudName = () => {
  const cloudName = [
    process.env.CLOUDINARY_NAME,
    process.env.CLOUDNARY_NAME,
  ].find((value) => value && value.trim());
  if (cloudName) {
    return cloudName.trim();
  }

  if (!process.env.FILES_STORAGE_URL) {
    return null;
  }

  const storageUrl = new URL(process.env.FILES_STORAGE_URL);
  if (storageUrl.hostname !== "res.cloudinary.com") {
    return null;
  }

  return storageUrl.pathname.split("/").filter(Boolean)[0] || null;
};

module.exports = (req, res, next) => {
  try {
    const imageName = req.params.imageName;
    const extension = path.extname(imageName).toLowerCase();
    if (
      !imageName ||
      imageName === "." ||
      imageName === ".." ||
      imageName.includes("/") ||
      imageName.includes("\\") ||
      !IMAGE_EXTENSIONS.has(extension)
    ) {
      return next();
    }

    const cloudinaryImageName = `${
      path.basename(imageName, path.extname(imageName)).trim()
    }${path.extname(imageName)}`;
    const cloudName = getCloudName();
    if (!cloudName) {
      return next();
    }
    if (!/^[\w-]+$/.test(cloudName)) {
      throw new Error("Invalid Cloudinary cloud name configuration.");
    }

    const destination = new URL(
      `https://res.cloudinary.com/${encodeURIComponent(
        cloudName
      )}/image/upload/${CLOUDINARY_FOLDER}/${encodeURIComponent(
        cloudinaryImageName
      )}`
    );
    return res.redirect(302, destination.toString());
  } catch (error) {
    return next(error);
  }
};
