const mongoose = require("mongoose");

const Offer = require("../models/offer");
const Product = require("../models/product");

const fileHelper = require("../utilities/file");

exports.getAddOffer = async (req, res, next) => {
  res.render("shop/add-offer", {
    pageTitle: "Add Offer",
    path: "/add-offer",
    isAuthenticated: req.admin ? true : false,
  });
};

exports.postAddOffer = async (req, res, next) => {
  const { title, categories } = req.body;
  const image = req.files["image"] ? req.files["image"][0] : undefined;
  console.log(title, categories, image);
  try {
    //Data validation
    if (!image) {
      const error = new Error("Image is required");
      error.statusCode = 422;
      throw error;
    }
    if (categories.length < 1) {
      const error = new Error("Categories are required");
      error.statusCode = 422;
      throw error;
    }
    await fileHelper.uploadToAzureHandler(image);
    //create offer
    const offer = new Offer({
      title,
      categories,
      Image: image.path,
      creator: req.admin,
    });
    //save to database
    await offer.save();
    res.status(201).json({ message: "Offer created successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getOffers = async (req, res, next) => {
  try {
    let offers = await Offer.find().sort({ createdAt: -1 });
    offers = offers.map((offer) => {
      return {
        ...offer._doc,
        productsNumber: offer.products.length,
      };
    });
    // console.log(offers);
    res.render("shop/offers", {
      pageTitle: "Offers",
      path: "/offers",
      isAuthenticated: req.admin ? true : false,
      offers,
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteOffer = async (req, res, next) => {
  const { offerId } = req.params;
  console.log(offerId);
  try {
    //delete offer
    const offer = await Offer.findByIdAndDelete(offerId);
    if (!offer) {
      const error = new Error("Offer not found");
      error.statusCode = 403;
      throw error;
    }
    //delete offer image
    await fileHelper.deleteFile(offer.Image);
    //send response
    res.status(201).json({ message: "Offer deleted successfully", offer });
  } catch (error) {
    next(error);
  }
};

exports.getManageOrders = async (req, res, next) => {
  const { offerId } = req.params;
  try {
    //validate date
    if (!offerId) {
      const error = new Error("Offer id is required");
      error.statusCode = 422;
      throw error;
    }
    //find offer
    const offer = await Offer.findById(offerId).populate("products");
    if (!offer) {
      const error = new Error("Offer not found");
      error.statusCode = 404;
      throw error;
    }
    // Sort offer products by category
    offer.products.sort((a, b) => {
      if (a.category < b.category) {
        return -1;
      }
      if (a.category > b.category) {
        return 1;
      }
      return 0;
    });
    console.log(offer);
    console.log("weve get a problem");
    //send response
    res.render("shop/manage-offers", {
      pageTitle: "Manage Offers",
      path: "/manage-offers",
      isAuthenticated: req.admin ? true : false,
      offer,
      errorMessage: null,
    });
  } catch (error) {
    next(error);
  }
};
exports.putEditOffer = async (req, res, next) => {
  const { offerId, title, categories } = req.body;
  const image = req.files["image"] ? req.files["image"][0] : undefined;
  console.log(offerId, title, categories, image);
  try {
    //validate data
    if (!offerId) {
      const error = new Error("Offer id is required");
      error.statusCode = 422;
      throw error;
    }
    //find offer
    const offer = await Offer.findById(offerId);

    //update the offer
    if (title) {
      offer.title = title;
    }
    if (categories) {
      offer.categories = categories;
    }
    if (image) {
      const oldImage = offer.Image;
      //upload new image and add path to the image variable.
      await fileHelper.uploadToAzureHandler(image);
      offer.Image = image.path;
      //delete old image
      await fileHelper.deleteFromAzureHandler(oldImage);
    }
    //save to database
    await offer.save();
    //send response
    res.status(201).json({ message: "Offer updated successfully" });
  } catch (error) {
    next(error);
  }
};

exports.postAddProductOffer = async (req, res, next) => {
  const { productId, offerId } = req.body;
  console.log(productId, offerId);

  try {
    //validate data
    if (!productId || !offerId) {
      const error = new Error("Product and offer ids are required");
      error.statusCode = 422;
      throw error;
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error("Invalid product ID");
    }

    if (!mongoose.Types.ObjectId.isValid(offerId)) {
      throw new Error("Invalid product ID");
    }

    //find product and offer
    const product = await Product.findById(productId);
    const offer = await Offer.findById(offerId);
    if (!product || !offer) {
      const error = new Error("Product or offer not found");
      error.statusCode = 404;
      throw error;
    }

    //if product already in offer
    if (offer.products.includes(product._id)) {
      const error = new Error("Product already in offer");
      error.statusCode = 403;
      throw error;
    }
    //add product to offer
    offer.products.push(product);
    await offer.save();
    //send response
    res.status(201).json({ message: "Product added to offer successfully" });
  } catch (error) {
    next(error);
  }
};

exports.deleteProductOffer = async (req, res, next) => {
  const { productId, offerId } = req.body;

  console.log(productId, offerId);
  try {
    //validate data
    if (!productId || !offerId) {
      const error = new Error("Product and offer ids are required");
      error.statusCode = 422;
      throw error;
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error("Invalid product ID");
    }

    if (!mongoose.Types.ObjectId.isValid(offerId)) {
      throw new Error("Invalid product ID");
    }

    //find product and offer
    const product = await Product.findById(productId);
    const offer = await Offer.findById(offerId);
    if (!product || !offer) {
      const error = new Error("Product or offer not found");
      error.statusCode = 404;
      throw error;
    }
    //remove product from offer
    offer.products = offer.products.filter(
      (prod) => prod.toString() !== productId
    );
    await offer.save();
    //send response
    res
      .status(201)
      .json({ message: "Product removed from offer successfully" });
  } catch (error) {
    next(error);
  }
};
