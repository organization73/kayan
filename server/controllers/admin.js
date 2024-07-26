const yup = require("yup");
const mongoose = require("mongoose");

const fileHelper = require("../utilities/file");
const Product = require("../models/product");
const Offer = require("../models/offer");

const productSchema = yup.object().shape({
  title: yup.string().required(),
  price: yup.number(),
  category: yup.string().required(),
  description: yup.string().required().min(5),
});

const PRODUCTS_PER_PAGE = 4;


exports.getHomePage = async (req, res, next) => {
  console.log("333");
  res.render("shop/index", {
    pageTitle: "Home",
    path: "/index",
    name:req.admin.userName,
    isAuthenticated: req.admin ? true : false,
  });
};

exports.getAddProduct = async (req, res, next) => {
  res.render("shop/edit-product", {
    pageTitle: "Add Product",
    path: "/add-product",
    isAuthenticated: req.admin ? true : false,
    editing: false,
    hasErrors: false,
  });
};

exports.postAddProduct = async (req, res, next) => {
  const { title, price, category, description } = req.body;
  const image = req.files["image"] ? req.files["image"][0] : undefined;
  const images = req.files["images"]
    ? req.files["images"].map((file) => file)
    : undefined;

  console.log(title, price, description, category, image, images);
  try {
    //Data validation
    await productSchema.validate({ title, price, description, category });
    //create object
    const product = new Product({
      title,
      price,
      category,
      description,
      mainImageUrl: image.path,
      images: images.map((img) => img.path),
      creator: req.admin,
    });
    //save to database
    await product.save();
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  const { category } = req.params;
  const page = req.query.page || 1;

  try {
    const products = await Product.find()
      .skip(PRODUCTS_PER_PAGE * (page - 1))
      .limit(PRODUCTS_PER_PAGE)
      .sort({ createdAt: -1 });

    const totalItems = await Product.find().countDocuments();

    console.log("hasNextPage", PRODUCTS_PER_PAGE * page < totalItems);
    console.log("totalItems", totalItems);
    console.log("hasPreviousPage", page > 1);
    console.log("nextPage", +page + 1);
    console.log("previousPage", page - 1);
    console.log("lastPage", Math.ceil(totalItems / PRODUCTS_PER_PAGE));

    res.render("shop/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/products",
      isAuthenticated: req.admin ? true : false,
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

exports.deleteProduct = async (req, res, next) => {
  const { productId } = req.params;
  console.log(productId);
  try {
    //delete product
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }
    // Delete product images
    try {
      await fileHelper.deleteFile(product.mainImageUrl);
      await Promise.all(
        product.images.map((img) => fileHelper.deleteFile(img))
      );
    } catch (fileError) {
      console.error("Error deleting product images:", fileError);
      // Handle the file deletion error, but continue
      // Optionally, you can pass the error to the next middleware
      next(fileError);
    }
    //delete prodcuct from offers.

    //send response
    res.status(200).json({ message: "Product deleted successfully ", product });
  } catch (error) {
    next(error);
  }
};

exports.getEditProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    //find product
    const product = await Product.findById(productId);
    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }

    //send response
    res.render("shop/edit-product", {
      pageTitle: "edit Product",
      path: "/edit-product",
      isAuthenticated: req.admin ? true : false,
      editing: true,
      product,
      hasErrors: false,
    });
  } catch (error) {
    next(error);
  }
};

exports.postEditProduct = async (req, res, next) => {
  const { productId } = req.params;
  const { title, price, category, description } = req.body;
  const image = req.files["image"] ? req.files["image"][0] : undefined;
  const images = req.files["images"]
    ? req.files["images"].map((file) => file)
    : undefined;
  console.log(productId, title, price, description, category, image, images);
  try {
    //Data validation
    await productSchema.validate({ title, price, description, category });
    console.log(1);
    //find product
    const product = await Product.findById(productId);
    console.log(product);
    console.log(2);
    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }
    //update product
    product.title = title;
    product.price = price;
    product.category = category;
    product.description = description;
    if (image) {
      const oldImage = product.mainImageUrl;
      product.mainImageUrl = image.path;
      //delete old image
      // fileHelper.deleteFile(oldImage);
      // Delete product images
      await fileHelper.deleteFile(oldImage);
    }

    if (images) {
      const oldImages = [...product.images];
      product.images = images.map((img) => img.path);
      //delete old images
      // oldImages.forEach((img) => fileHelper.deleteFile(img));
      await Promise.all(oldImages.map((img) => fileHelper.deleteFile(img)));
    }
    console.log(3);
    //save to database
    await product.save();
    console.log(4);
    res.status(201).json({ message: "Product updated successfully" });
    console.log(5);
  } catch (error) {
    next(error);
  }
};

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
      offer.Image = image.path;
      //delete old image
      await fileHelper.deleteFile(oldImage);
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
