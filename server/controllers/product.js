const yup = require("yup");

const Review = require("../models/review");
const Product = require("../models/product");
const Offer = require("../models/offer");
const fileHelper = require("../utilities/file");

const productSchema = yup.object().shape({
  title: yup.string().required(),
  price: yup.number(),
  category: yup.string().required(),
  description: yup.string().required().min(5),
});

const PRODUCTS_PER_PAGE = 4;

const reviewSchema = yup.object().shape({
  productId: yup.string().required(),
  creator: yup.object().shape({
    name: yup.string(),
    email: yup.string().email(),
    phone: yup.string(),
    image: yup.string(),
  }),
  rating: yup.number().required(),
  review: yup.string().required(),
});

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
  //check if image and images are uploaded
  const image = req.files["image"] ? req.files["image"][0] : undefined;
  const images = req.files["images"]
    ? req.files["images"].map((file) => file)
    : undefined;

  // console.log(title, price, description, category, image, images);
  try {
    //Data validation
    await productSchema.validate({ title, price, description, category });
    //upload image
    if (!image) {
      const error = new Error("Image is required");
      error.statusCode = 422;
      throw error;
    }
    if (images.length < 1) {
      const error = new Error("Images are required");
      error.statusCode = 422;
      throw error;
    }
    await fileHelper.uploadToAzureHandler(image);
    await Promise.all(
      images.map((img) => fileHelper.uploadToAzureHandler(img))
    );
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
    await Offer.updateMany(
      { products: { $in: [productId] } },
      { $pull: { products: productId } }
    );

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
    //find product
    const product = await Product.findById(productId);
    console.log(product);
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
      //upload new image
      await fileHelper.uploadToAzureHandler(image);
      const oldImage = product.mainImageUrl;
      product.mainImageUrl = image.path;
      //delete old image
      await fileHelper.deleteFromAzureHandler(oldImage);
    }

    if (images) {
      const oldImages = [...product.images];
      //upload new images and create image path
      await Promise.all(
        images.map((img) => fileHelper.uploadToAzureHandler(img))
      );
      product.images = images.map((img) => img.path);
      //delete old images
      // oldImages.forEach((img) => fileHelper.deleteFile(img));
      await Promise.all(
        oldImages.map((img) => fileHelper.deleteFromAzureHandler(img))
      );
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

exports.addReview = async (req, res, next) => {
  const { productId, creator, rating, review } = req.body;
  console.log(
    "productId, creator, rating, review",
    productId,
    creator,
    rating,
    review
  );

  try {
    // Validate the request body
    await reviewSchema.validate({
      productId,
      creator,
      rating,
      review,
    });

    //check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }

    // Create a new review
    const newReview = new Review({
      productId,
      creator,
      rating,
      review,
    });
    await newReview.save();
    res.status(201).json({
      message: "Review added successfully",
      review: newReview,
    });
  } catch (error) {
    next(error);
  }
};

exports.getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ approver: { $exists: false } }).populate("productId");
    console.log(reviews);
    res.render("shop/reviews", {
      pageTitle: "Reviews",
      path: "/products-reviews",
      isAuthenticated: req.admin ? true : false,
      reviews,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteReview = async (req, res, next) => {
  const { reviewId } = req.params;
  try {
    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) {
      const error = new Error("Review not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: "Review deleted successfully", review });
  } catch (error) {
    next(error);
  }
};

exports.approveReview = async (req, res, next) => {
  const { reviewId } = req.params;
  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      const error = new Error("Review not found");
      error.statusCode = 404;
      throw error;
    }
    review.approver = req.admin;
    await review.save();
    res.status(200).json({ message: "Review approved successfully", review });
  } catch (error) {
    next(error);
  }
};