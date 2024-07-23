const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const app = express();

const PORT = process.env.PORT || 8080;

const authRoutes = require("./routes/auth");

const adminRoutes = require("./routes/admin");

const errorController = require("./controllers/error");

const authMiddleware = require("./middleware/auth");

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
app.use("/images", express.static("images"));

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
  res.status(status).json({ message: message });
});
app.use("/404",errorController.get404);
app.use("/500",errorController.get500);

mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => {
    console.log("conneted to the db");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
