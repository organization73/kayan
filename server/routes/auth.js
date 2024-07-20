const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");

router.get("/register", authController.getRegister);

router.post("/register", authController.postRegister);

router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);

router.get("/reset-password", authController.getResetPassword);

router.post("/reset-password", authController.postResetPassword);

module.exports = router;
