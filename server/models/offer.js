const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const offerSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    Image: {
      type: String,
      required: true,
    },
    categories: [
      {
        type: String,
      },
    ],
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Offer", offerSchema);
