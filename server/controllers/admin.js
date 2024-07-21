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
    //delete product images
    fileHelper.deleteFile(product.mainImageUrl);
    product.images.forEach((img) => fileHelper.deleteFile(img));
    //delete product from offers

    //send response
    res.status(200).json({ message: "Product deleted successfully ", product });
  } catch (error) {
    next(error);
  }
};
