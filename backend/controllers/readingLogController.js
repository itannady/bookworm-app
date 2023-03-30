const ReadingLog = require("../models/ReadingLog");

exports.getStreak = (req, res, next) => {
  const userId = req.params.userId;

  ReadingLog.findOne({ user: userId })
    .then((readingLog) => {
      if (!readingLog) {
        res.status(404).json({
          message: "Reading log not found",
        });
      } else {
        res.status(200).json({ streak: readingLog.streak });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Getting streak failed",
        error: error,
      });
    });
};
