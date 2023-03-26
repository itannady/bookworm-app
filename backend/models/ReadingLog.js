const mongoose = require("mongoose");

const readingLogSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
  },
  totalPages: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  streak: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("ReadingLog", readingLogSchema);
