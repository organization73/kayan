const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "admin",
    },
    isConfirm: { type: Boolean, default: false },
    authenticationToken:{type:String},
    confirmToken: String,
    confirmTokenExpiration: Date,
    resetToken: String,
    resetTokenExpiration: Date,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Admin", adminSchema);
