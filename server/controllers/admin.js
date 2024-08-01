const yup = require("yup");

const fileHelper = require("../utilities/file");
const { listImagesInContainer } = require("../utilities/file");

const Product = require("../models/product");
const Offer = require("../models/offer");
const GalleryReview = require("../models/gallery-reviews");
const Complaint = require("../models/complaint");

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

const PRODUCTS_PER_PAGE = 4;

exports.getHomePage = async (req, res, next) => {
  const list = await listImagesInContainer();
  console.log(list);
  list.sort();
  let imageNumber = 0;
  //get the images from the db
  const dbImagesList = [];
  const products = await Product.find();
  products.forEach((product) => {
    imageNumber++;
    dbImagesList.push(product.mainImageUrl);
    product.images.forEach((image) => {
      imageNumber++;
      dbImagesList.push(image);
    });
  });
  const reviews = await GalleryReview.find();
  reviews.forEach((review) => {
    imageNumber++;
    dbImagesList.push(review.image);
  });

  const offers = await Offer.find();
  offers.forEach((offer) => {
    imageNumber++;
    dbImagesList.push(offer.Image);
  });
  dbImagesList.sort();

  //get images that in the azure but not in the db
  const imagesNotInDb = list.filter((image) => !dbImagesList.includes(image));

  //get the complaints number
  const numberOfcomplaints = await Complaint.countDocuments();

  res.render("shop/index", {
    pageTitle: "Home",
    path: "/index",
    name: req.admin.userName,
    isAuthenticated: req.admin ? true : false,
    imagesNotInDb,
    imageNumber,
    numberOfProducts: products.length,
    numberOfOffers: offers.length,
    numberOfReviews: reviews.length,
    numberOfcomplaints,
  });
};

exports.getAddGallaryPage = async (req, res, next) => {
  const galleryReviews = await GalleryReview.find();
  console.log("getAddProductPage");
  res.render("shop/add-gallary-review", {
    pageTitle: "Add Gallary Review",
    path: "/add-gallary-review",
    isAuthenticated: req.admin ? true : false,
    reviews: galleryReviews,
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
exports.deleteGallaryReview = async (req, res, next) => {
  const { id } = req.params;
  try {
    const review = await GalleryReview.findById(id);
    if (!review) {
      const error = new Error("Review not found");
      error.statusCode = 404;
      throw error;
    }
    //delete image from azure
    await fileHelper.deleteFromAzureHandler(review.image);
    await GalleryReview.findByIdAndDelete(id);
    res.status(201).json({ message: "Review deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getComplainsPage = async (req, res, next) => {
  const complaints = await Complaint.find();

  res.render("shop/complains", {
    pageTitle: "Complains",
    path: "/complains",
    isAuthenticated: req.admin ? true : false,
    complaints,
  });
};
exports.postComplainsPage = async (req, res, next) => {
  const { name, email, message, phone } = req.body;
  try {
    const complaint = new Complaint({
      name,
      email,
      message,
      phone,
    });
    await complaint.save();
    res.status(201).json({ message: "Complaint submitted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.deleteComplain = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!id) {
      const error = new Error("Complaint id is required");
      error.statusCode = 422;
      throw error;
    }
    const complaint = await Complaint.findByIdAndDelete(id);
    if (!complaint) {
      const error = new Error("Complaint not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(201).json({ message: "Complaint deleted successfully" });
  } catch (error) {
    next(error);
  }
};
