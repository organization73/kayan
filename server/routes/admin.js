const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin");

const authMiddleware = require("../middleware/auth");

router.get("/", authMiddleware, adminController.getHomePage);

router.get("/add-product", authMiddleware, adminController.getAddProduct);

router.post("/add-product", authMiddleware, adminController.postAddProduct);

router.get("/products", authMiddleware, adminController.getProducts);

module.exports = router;
