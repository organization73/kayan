const yup = require("yup");

const fileHelper = require("../utilities/file");
const Product = require("../models/product");
const Offer = require("../models/offer");

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
