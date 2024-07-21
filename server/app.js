const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const app = express();

const PORT = process.env.PORT || 8080;

const authRoutes = require("./routes/auth");

const adminRoutes = require("./routes/admin");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).fields([
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ])
);
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));

app.use(morgan("dev"));

app.use(authRoutes);

app.use(adminRoutes);

app.get("/ping", (req, res) => {
  res.send("I am listening.");
});

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  let message = error.message;
  console.log(error);
  if (status === 500) {
    res.render("500", {
      pageTitle: "500",
      path: "/500",
      isAuthenticated: req.admin ? true : false,
      message
    });
  }
  res.status(status).json({ message: message });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => {
    console.log("conneted to the db");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
