const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const bookRoutes = require("./routes/books");
const userRoutes = require("./routes/user");
const readingLogRoutes = require("./routes/readingLog");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use("/", bookRoutes);
app.use("/user", userRoutes);
app.use("/log", readingLogRoutes);

// connect to MongoDB
const URL = process.env.MONGODB_URL;
mongoose.set("strictQuery", false);
mongoose
  .connect(URL)
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

module.exports = app;
