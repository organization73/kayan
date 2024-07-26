const jwt = require("jsonwebtoken");
const Admin = require("../models/admin"); // Assuming you have a User model

const authMiddleware = async (req, res, next) => {
  // Get the token from the request headers
  try {
    console.log(req.cookies)
    // token = req.headers.authorization.split(" ")[1];
    let token = req.cookies.token;
    if (!token) {
      res.redirect("/api/login");
    }
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Check if the admin exists in the database
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      const error = new Error("No admin found");
      error.statusCode = 401;
      throw error;
      // return res.status(401).json({ message: "Invalid token1" });
    }
    //make sure the token is still valid
    if (admin.authenticationTokenExpiration < new Date()) {
      const error = new Error("Token expired. login again");
      error.statusCode = 500;
      throw error;
    }
    //make sure the authetication token is the one in the db
    if (admin.authenticationToken !== token) {
      const error = new Error("Old token no longer work login again");
      error.statusCode = 500;
      throw error;
    }

    // Attach the admin to the request
    req.admin = admin;
    req.isAuthenticated = true;
    // console.log('authorized requist:', req.admin)
    next();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    if (!res.headersSent) {
      console.log("unfortunately an error occured");
      return res.redirect("/api/login?mode=invalid_token");
  }
}
};

module.exports = authMiddleware;
