exports.get404 = (req, res, next) => {
  console.log("not find page.")
  res.status(404).render("404", {
    pageTitle: "Page Not Found",
    path: "/404",
    isAuthenticated: req.admin? true : false,
  });
};

exports.get500 = (req, res, next) => {
  res.status(500).render("500", {
    pageTitle: "Page Not Found",
    path: "/500",
    isAuthenticated: req.admin? true : false,
  });
};