const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  creator:{
    name:String,
    email:String,
    phone:String,
    image:String
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  approver: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
  },

});

module.exports = mongoose.model("Review", reviewSchema);