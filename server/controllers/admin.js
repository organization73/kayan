const yup = require("yup");

const fileHelper = require("../utilities/file");
const Product = require("../models/product");
const Offer = require("../models/offer");
const GalleryReview = require("../models/gallery-reviews");

const productSchema = yup.object().shape({
  title: yup.string().required(),
  price: yup.number(),
  category: yup.string().required(),
  description: yup.string().required().min(5),
});

const azureStorageConfig = {
  accountName: process.env.ACCOUNT_NAME,
  sasToken: process.env.SAS_TOKEN,
  containerName: process.env.CONTAINER_NAME,
};

const AZURE_FILE_PATH = `https://${azureStorageConfig.accountName}.blob.core.windows.net/${azureStorageConfig.containerName}/`;

const PRODUCTS_PER_PAGE = 4;

exports.getHomePage = async (req, res, next) => {
  console.log("333");
  res.render("shop/index", {
    pageTitle: "Home",
    path: "/index",
    name: req.admin.userName,
    isAuthenticated: req.admin ? true : false,
  });
};

exports.getAddGallaryPage = async (req, res, next) => {
  console.log("getAddProductPage");
  res.render("shop/add-gallary-review", {
    pageTitle: "Add Gallary Review",
    path: "/add-gallary-review",
    isAuthenticated: req.admin ? true : false,
  });
};

exports.postAddGallaryPage = async (req, res, next) => {
  const { image } = req.files;

  try {
    if (!image) {
      const error = new Error("Image is required");
      error.statusCode = 422;
      throw error;
    }
    //upload image to azure
    await fileHelper.uploadToAzureHandler(image[0]);

    //store image path in database
    const galleryReview = new GalleryReview({
      image: image[0].path,
    });
    console.log(galleryReview);
    await galleryReview.save();
    res.status(201).json({ message: "Image uploaded successfully" });
  } catch (error) {
    next(error);
  }
};
