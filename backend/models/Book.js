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
  totalPages: {
    type: Number,
  },
  pagesRead: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["To Read", "Reading Now", "Have Read"],
    default: "To Read",
  },
  notes: {
    type: String,
  },
  lastUpdated: {
    type: Date,
  },
  finishedDate: {
    type: Date,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Book", bookSchema);
