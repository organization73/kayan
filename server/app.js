const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

const PORT = process.env.PORT || 8080;

const authRoutes = require("./routes/auth");

const adminRoutes = require("./routes/admin");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

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
  const message = error.message;
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
