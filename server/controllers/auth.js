const Admin = require("../models/admin");
exports.getRegister = async (req, res, next) => {
  // const admin = new Admin({
  //   userName: "abdo",
  //   email: "abdo@gmail.com",
  //   password: "12345678",
  // });
  // const result = await admin.save();
  console.log(result);
  console.log("GET /auth/register");
  res.render("auth/register", {
    pageTitle: "Register",
    path: "register",
    isAuthenticated: false,
  });
};
