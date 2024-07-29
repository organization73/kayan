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
  "/add-gallary-review",
  authMiddleware,
  adminController.getAddGallaryPage
);

router.post(
  "/add-gallary-review",
  authMiddleware,
  adminController.postAddGallaryPage
);

router.delete(
  "/gallary-review/:id",
  authMiddleware,
  adminController.deleteGallaryReview
);

router.get("/complains", authMiddleware, adminController.getComplainsPage);

router.post("/complain", adminController.postComplainsPage);

router.delete("/complain/:id", authMiddleware, adminController.deleteComplain);

router.get("/", authMiddleware, adminController.getHomePage);

module.exports = router;
