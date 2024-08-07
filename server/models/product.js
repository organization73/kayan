const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
    },
    mainImageUrl: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
