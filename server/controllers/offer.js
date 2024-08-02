const mongoose = require("mongoose");

const Offer = require("../models/offer");
const Product = require("../models/product");

const fileHelper = require("../utilities/file");

const PRODUCTS_PER_PAGE = 6;

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
    await fileHelper.deleteFromAzureHandler(offer.Image);
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

exports.getClientOffers = async (req, res, next) => {
  try {
    let offers = await Offer.find().sort({ createdAt: -1 });
    res.status(200).json({ offers });
  } catch (error) {
    next(error);
  }
};

exports.getClientOffer = async (req, res, next) => {
  console.log("we are here");
  let { category, sortBY, search, page } = req.query;
  const { offerId } = req.params;
  page = +page || 1;
  let filter = {};

  // Apply category filter if provided
  if (category) {
    filter.category = category;
  }

  // Apply search filter if provided
  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  try {
    const offer = await Offer.findById(offerId).populate("products");
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    let products = offer.products;

    // Apply filter offer categories
    if (offer.categories && offer.categories.length > 0) {
      products = products.filter((product) =>
        offer.categories.includes(product.category)
      );
    }

    // Apply filters to products
    if (category) {
      products = products.filter((product) => product.category === category);
    }
    if (search) {
      const regex = new RegExp(search, "i");
      products = products.filter((product) => regex.test(product.title));
    }

    // Apply sorting to products
    if (sortBY === "recent") {
      products = products.sort((a, b) => b.createdAt - a.createdAt);
    } else if (sortBY === "popular") {
      products = products.sort((a, b) => b.rating - a.rating);
    } else if (sortBY === "price-asc") {
      products = products.sort((a, b) => a.price - b.price);
    } else if (sortBY === "price-dsc") {
      products = products.sort((a, b) => b.price - a.price);
    }

    const totalItems = products.length;
    products = products.slice(
      PRODUCTS_PER_PAGE * (page - 1),
      PRODUCTS_PER_PAGE * page
    );

    res.status(200).json({
      prods: products,
      currentPage: +page,
      hasNextPage: PRODUCTS_PER_PAGE * page < totalItems,
      hasPreviousPage: page > 1,
      nextPage: +page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalItems / PRODUCTS_PER_PAGE),
    });
  } catch (err) {
    next(err);
  }
};

exports.getClientOfferDetails = async (req, res, next) => {
  console.log("hi");
  const { offerId } = req.params;
  try {
    const offer = await Offer.findById(offerId);
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }
    res.status(200).json({ offer });
  } catch (err) {
    next(err);
  }
};
