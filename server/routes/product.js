const express = require("express");
const router = express.Router();

const productController = require("../controllers/product");

const authMiddleware = require("../middleware/auth");

router.post("/add-review", authMiddleware, productController.addReview);

module.exports = router;
