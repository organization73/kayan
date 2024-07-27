const fs = require("fs");
const path = require("path");
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

const blobServiceClient = new BlobServiceClient(
  `https://${azureStorageConfig.accountName}.blob.core.windows.net/?${azureStorageConfig.sasToken}`
);

const containerClient = blobServiceClient.getContainerClient(
  azureStorageConfig.containerName
);

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
      await blockBlobClient.uploadData(image[0].buffer, image[0].size);
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

exports.deleteFromAzure = (imagePath) => {
  return new Promise(async (resolve, reject) => {
    try {
      await deleteFile(imagePath);

      const blockBlobClient = containerClient.getBlockBlobClient(imagePath);
      await blockBlobClient.delete();

      resolve({ message: "File deleted successfully." });
    } catch (error) {
      console.error(error); // Log the error
      reject(new Error("Failed to delete file from Azure.")); // Reject with a new error
    }
  });
};
