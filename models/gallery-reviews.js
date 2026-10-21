const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const galleryReviewSchema = new Schema(
  {
    title: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("GalleryReview", galleryReviewSchema);