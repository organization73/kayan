const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const complaintSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    phone: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);
