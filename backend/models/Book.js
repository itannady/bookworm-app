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
});

module.exports = mongoose.model("Book", bookSchema);
