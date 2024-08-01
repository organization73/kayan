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

const AZURE_FILE_PATH = `https://${azureStorageConfig.accountName}.blob.core.windows.net/${azureStorageConfig.containerName}/`;

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
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

    // Get a reference to the container
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // List blobs in the container
    let imageUrls = [];
    for await (const blob of containerClient.listBlobsFlat()) {
      // Check if the blob is an image based on its extension
      if (/\.(jpg|jpeg|png|gif|bmp)$/i.test(blob.name)) {
        // Construct the URL for the blob
        const blobUrl = containerClient.getBlobClient(blob.name).url;
        const cleanUrl = blobUrl.split('?')[0].replace(/%20/g, ' ');
        imageUrls.push(cleanUrl);
      }
    }

    return imageUrls;
  } catch (error) {
    if (error.statusCode === 403 && error.details.errorCode === 'AuthorizationResourceTypeMismatch') {
      throw new Error('The SAS token does not have the required permissions to list blobs in this container.');
    } else {
      throw error;
    }
  }
};