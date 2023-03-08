const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  authors: {
    type: [String],
  },
  description: {
    type: String,
  },
  isbn: {
    type: String,
  },
  categories: {
    type: [String],
  },
  thumbnail: {
    type: String,
  },
  averageRating: {
    type: Number,
  },
  ratingsCount: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Book", bookSchema);
