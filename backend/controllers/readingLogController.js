const ReadingLog = require("../models/ReadingLog");
const Book = require("../models/Book");

exports.getStreak = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const readingLog = await ReadingLog.findOne({ user: userId });

    if (!readingLog) {
      console.log("No reading log found");
    } else {
      // checks reading log last updated date - updates streak
      const lastUpdated = readingLog.date;
      const currentDate = new Date();
      const diffInDays = Math.round(
        Math.abs((currentDate - lastUpdated) / (24 * 60 * 60 * 1000))
      );

      console.log("diff in days:", diffInDays);

      if (diffInDays > 1) {
        // streak is broken if no activity in last 48 hours
        readingLog.streak = 0;
        await readingLog.save();
      }

      res.status(200).json({ streak: readingLog.streak });
    }
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({
      message: "Getting streak failed",
      error: error,
    });
  }
};

exports.getTotalBooks = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const month = req.params.month;

    const readingLog = await ReadingLog.findOne({ user: userId }).exec();
    if (!readingLog) {
      res.status(404).json({ message: "Reading log not found" });
      return;
    }

    let totalBooksRead = 0;
    const books = await Book.find({ user: req.params.userId }).exec();
    books.forEach((book) => {
      // only add pages read in the specified month
      if (
        book.status === "Have Read" &&
        book.lastUpdated.getMonth() === month - 1
      ) {
        totalBooksRead++;
      }
    });

    readingLog.totalBooksRead = totalBooksRead;
    console.log("reading log", totalBooksRead);
    await readingLog.save();
    res.status(200).json({ totalBooksRead });
  } catch (error) {
    res.status(500).json({ message: "Getting total pages failed", error });
  }
};
