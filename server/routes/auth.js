const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");

router.get("/register", authController.getRegister);

router.post("/register", authController.postRegister);

router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);

router.get("/forget-password", authController.getForgetPassword);

router.post("/forget-password", authController.postForgetPassword);

router.get("/reset-password/:token", authController.getResetPassword);

router.post("/reset-password", authController.postResetPassword);

router.post("/logout", authController.postLogout);

module.exports = router;
