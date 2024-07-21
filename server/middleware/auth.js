const jwt = require("jsonwebtoken");
const Admin = require("../models/admin"); // Assuming you have a User model

const authMiddleware = async (req, res, next) => {

  // Get the token from the request headers
  try {
    // token = req.headers.authorization.split(" ")[1];
    console.log("req.cookies",req.cookies)
    let token = req.cookies.token;
    if (!token) {
      return res.status(403).render("auth/login", {
        errorMessage: "No token provided",
        pageTitle: "Login",
        isAuthenticated: false,
        path: "/login",
        validationErrors: [],
        oldInput: {},
      });
    }
    // Verify and decode the token
    console.log("11111")
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("222")
    // Check if the admin exists in the database
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      const error = new Error("No admin found");
      error.statusCode = 401;
      throw error;
      // return res.status(401).json({ message: "Invalid token1" });
    }
    req.admin = admin;
    req.isAuthenticated = true;
    // console.log('authorized requist:', req.admin)
    next();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

module.exports = authMiddleware;