const yup = require("yup");

const Product = require("../models/product");
const fileHelper = require("../utilities/file");

const productSchema = yup.object().shape({
  title: yup.string().required(),
  price: yup.number(),
  category: yup.string().required(),
  description: yup.string().required().min(5),
});

exports.getHomePage = async (req, res, next) => {
  res.render("shop/index", {
    pageTitle: "Home",
    path: "/index",
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
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.render("shop/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/products",
      isAuthenticated: req.admin ? true : false,
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
}
  