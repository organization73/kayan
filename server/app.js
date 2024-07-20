const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 8080;

const authRoutes = require("./routes/auth");

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));

app.use(morgan("dev"));

app.use(authRoutes);

app.get("/", (req, res) => {
  res.send("I am listening.");
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
