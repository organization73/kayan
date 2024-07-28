const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin");

const authMiddleware = require("../middleware/auth");

const fileHelper = require("../utilities/file");

router.post("/upload", fileHelper.uploadToAzure, (req, res) => {
  res.status(201).json({ message: "Files uploaded successfully" });
});

router.delete("/image", fileHelper.deleteFromAzure, (req, res) => {
  res.status(201).json({ message: "Files uploaded successfully" });
});

router.get(
  "/",
  (req, res,next) => {
    console.log("here");
    next();
  },
  authMiddleware,
  adminController.getHomePage
);

module.exports = router;
