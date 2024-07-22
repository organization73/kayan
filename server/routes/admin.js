const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin");

const authMiddleware = require("../middleware/auth");

router.get("/", authMiddleware, adminController.getHomePage);

router.get("/add-product", authMiddleware, adminController.getAddProduct);

router.post("/add-product", authMiddleware, adminController.postAddProduct);

router.delete("/product/:productId", authMiddleware, adminController.deleteProduct);

router.get("/products", authMiddleware, adminController.getProducts);

router.get("/edit-product/:productId", authMiddleware, adminController.getEditProduct);

router.post("/edit-product/:productId", authMiddleware, adminController.postEditProduct);

module.exports = router;
