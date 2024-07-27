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

router.get("/add-product", authMiddleware, adminController.getAddProduct);

router.post("/add-product", authMiddleware, adminController.postAddProduct);

router.delete(
  "/product/:productId",
  authMiddleware,
  adminController.deleteProduct
);

router.get("/products", authMiddleware, adminController.getProducts);

router.get(
  "/edit-product/:productId",
  authMiddleware,
  adminController.getEditProduct
);

router.post(
  "/edit-product/:productId",
  authMiddleware,
  adminController.postEditProduct
);

router.get("/add-offer", authMiddleware, adminController.getAddOffer);

router.post("/add-offer", authMiddleware, adminController.postAddOffer);

router.get("/offers", authMiddleware, adminController.getOffers);

router.delete("/offer/:offerId", authMiddleware, adminController.deleteOffer);

router.get("/offer/:offerId", authMiddleware, adminController.getManageOrders);

router.put("/edit-offer", authMiddleware, adminController.putEditOffer);

router.post(
  "/add-product-offer",
  authMiddleware,
  adminController.postAddProductOffer
);

router.delete(
  "/delete-product-offer",
  authMiddleware,
  adminController.deleteProductOffer
);

module.exports = router;
