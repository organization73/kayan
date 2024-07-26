const yup = require("yup");
const Review = require("../models/review");
const Product = require("../models/product");

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
exports.addReview = async (req, res, next) => {
  const { productId, creator, rating, review } = req.body;
   console.log("productId, creator, rating, review", productId, creator, rating, review);

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
      approver: req.admin._id,
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
