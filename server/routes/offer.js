const express = require('express');
const router = express.Router();  

const authMiddleware = require('../middleware/auth');

const offerController = require('../controllers/offer');

router.get("/add-offer", authMiddleware, offerController.getAddOffer);

router.post("/add-offer", authMiddleware, offerController.postAddOffer);

router.get("/offers", authMiddleware, offerController.getOffers);

router.delete("/offer/:offerId", authMiddleware, offerController.deleteOffer);

router.get("/offer/:offerId", authMiddleware, offerController.getManageOrders);

router.put("/edit-offer", authMiddleware, offerController.putEditOffer);

router.post(
  "/add-product-offer",
  authMiddleware,
  offerController.postAddProductOffer
);

router.delete(
  "/delete-product-offer",
  authMiddleware,
  offerController.deleteProductOffer
);

//client routes
router.get("/client/offers", offerController.getClientOffers);

module.exports = router;