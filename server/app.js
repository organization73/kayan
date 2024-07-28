const fs = require("fs");

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const cors = require("cors");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8080;

const authRoutes = require("./routes/auth");

const adminRoutes = require("./routes/admin");

const productRoutes = require("./routes/product");

const offerRoutes = require("./routes/offer");

const errorController = require("./controllers/error");

const authMiddleware = require("./middleware/auth");

const Admin = require("./models/admin");

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


app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: fileFilter,
});

app.use(
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ])
);

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/api/", express.static("public"));
app.use("/api/images", express.static("images"));

app.use(morgan("dev"));

app.get("/api/ping", async (req, res) => {
  const admin = await Admin.find().select("-password");
  res.status(200).json({
    message: "I am working fine.",
    admin,
    email: process.env.EMAIL_FROM,
  });
});

app.use("/api", authRoutes);

app.use("/api", adminRoutes);

app.use("/api", productRoutes);

app.use("/api", offerRoutes);

app.use("/api/500", errorController.get500);

// app.use(authMiddleware, errorController.get404);
app.use("/", authMiddleware, errorController.get404);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  let message = error.message;
  console.log(error);
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
