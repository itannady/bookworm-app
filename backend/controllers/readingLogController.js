const Book = require("../models/Book");
const ReadingLog = require("../models/ReadingLog");
const User = require("../models/User");

exports.getTotalPages = async (req, res, next) => {
  let streak = 0;

  let today = new Date();

  let readingLog = await ReadingLog.findOne({ user: req.params.userId }).exec();
  if (!readingLog) {
    readingLog = new ReadingLog(user);
  }

  let diff = today - readingLog.date;

  var msec = diff;
  var hh = Math.floor(msec / 1000 / 60 / 60);
  msec -= hh * 1000 * 60 * 60;
  var mm = Math.floor(msec / 1000 / 60);
  msec -= mm * 1000 * 60;
  var ss = Math.floor(msec / 1000);
  msec -= ss * 1000;

  console.log("hours since last", hh);
  console.log("today", today);
  console.log("reading log", readingLog.date);

  const user = { user: req.params.userId };
  const update = { streak: readingLog.streak + 1, date: new Date() };
  const options = { new: true, upsert: true };

  if (hh > 24 && hh < 48) {
    ReadingLog.findOneAndUpdate(user, update, options)
      .then((result) => {
        console.log("this works", result);
      })
      .catch((error) => {
        res.status(500).json({
          message: "An error occurred while updating reading log",
          error: error,
        });
      });
  }

  // ReadingLog.findOneAndUpdate(user, update, options)
  //   .then((result) => {
  //     res.status(200).json({
  //       message: "Total pages updated successfully",
  //       streak: result.streak,
  //     });
  //   })
  //   .catch((error) => {
  //     res.status(500).json({
  //       message: "An error occurred while updating reading log",
  //       error: error,
  //     });
  //   });
};
