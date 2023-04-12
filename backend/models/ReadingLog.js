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
  totalPagesRead: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  streak: {
    type: Number,
    default: 0,
  },
  totalBooksRead: {
    type: Number,
  },
});

module.exports = mongoose.model("ReadingLog", readingLogSchema);
