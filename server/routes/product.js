const express = require("express");
const router = express.Router();

const productController = require("../controllers/product");

const authMiddleware = require("../middleware/auth");


router.get("/add-product", authMiddleware, productController.getAddProduct);

router.post("/add-product", authMiddleware, productController.postAddProduct);

router.delete(
  "/product/:productId",
  authMiddleware,
  productController.deleteProduct
);

router.get("/products", authMiddleware, productController.getProducts);

router.get(
  "/edit-product/:productId",
  authMiddleware,
  productController.getEditProduct
);

router.post(
  "/edit-product/:productId",
  authMiddleware,
  productController.postEditProduct
);

router.post("/add-review", productController.addReview);

router.get("/products-reviews", authMiddleware, productController.getReviews);

router.delete("/product-review/:reviewId", authMiddleware, productController.deleteReview);

router.patch("/approve-product-review/:reviewId", authMiddleware, productController.approveReview);

router.get("/client/products", productController.getClientProducts);


module.exports = router;
