exports.getHomePage = async (req, res, next) => {
  res.render("shop/index", {
    pageTitle: "Home",
    path: "/index",
    // isAuthenticated: req.admin ? true : false,
    isAuthenticated: true,
  });
};

exports.getAddProduct = async (req, res, next) => {
  res.render("shop/edit-product", {
    pageTitle: "Add Product",
    path: "/add-product",
    // isAuthenticated: req.admin ? true : false,
    isAuthenticated: true,
    editing: false,
    hasErrors: false,
  });
}