exports.getHomePage = async (req, res, next) => {
  res.render("shop/index", {
    pageTitle: "Home",
    path: "/index",
    // isAuthenticated: req.admin ? true : false,
    isAuthenticated: true,
  });
};
