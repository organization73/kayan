const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const validCategories = [
  "bedroom",
  "office",
  "kids-room",
  "dining-room",
  "sofa",
  "salon",
  "table",
  "cabinet",
];

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
      enum: validCategories,
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
    highlights: {
      type: String,
    },

    mainImageUrl: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 5.0,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    images: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
