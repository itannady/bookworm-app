const ReadingLog = require("../models/ReadingLog");
const Book = require("../models/Book");

exports.getStreak = (req, res, next) => {
  const userId = req.params.userId;

  console.log("userId:", userId);

  ReadingLog.findOne({ user: userId })
    .then((readingLog) => {
      console.log("readingLog:", readingLog);

      if (!readingLog) {
        console.log("no reading log found");
      } else {
        // checks reading log last updated date - updates streak
        const lastUpdated = readingLog.date;
        const currentTime = Date.now();
        const timeDiffInHours = (currentTime - lastUpdated) / (1000 * 60 * 60);

        console.log("lastUpdated:", lastUpdated);
        console.log("currentTime:", currentTime);
        console.log("timeDiffInHours:", timeDiffInHours);

        if (timeDiffInHours > 48) {
          // streak is broken if no activity in last 48 hours
          readingLog.streak = 0;
          readingLog.save();
        }

        res.status(200).json({ streak: readingLog.streak });
      }
    })
    .catch((error) => {
      console.log("error:", error);
      res.status(500).json({
        message: "Getting streak failed",
        error: error,
      });
    });
};

exports.getTotalPages = async (req, res, next) => {
  const userId = req.params.userId;
  const month = req.params.month;

  let totalPagesRead = 0;
  const books = await Book.find({ user: req.params.userId }).exec();
  books.forEach((book) => {
    if (book.lastUpdated) {
      // only add pages read in the specified month
      if (book.lastUpdated.getMonth() === month - 1) {
        totalPagesRead += book.pagesRead;
      }
    }
  });

  ReadingLog.findOne({ user: userId })
    .then((readingLog) => {
      if (!readingLog) {
        res.status(404).json({
          message: "Reading log not found",
        });
      } else {
        readingLog.totalPagesRead = totalPagesRead;
        console.log("reading log", totalPagesRead);
        return readingLog.save();
      }
    })
    .then(() => {
      res.status(200).json({ totalPagesRead: totalPagesRead });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Getting total pages failed",
        error: error,
      });
    });
};
