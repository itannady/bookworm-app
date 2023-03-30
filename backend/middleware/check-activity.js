const Book = require("../models/Book");
const ReadingLog = require("../models/ReadingLog");

module.exports = async (req, res, next) => {
  const book = req.body;
  const user = { user: book.userId };
  const options = { new: true, upsert: true };

  // check if pagesRead is updated
  if (book.pagesRead) {
    let currentDate = new Date();

    let readingLog = await ReadingLog.findOne({
      user: book.userId,
    }).exec();
    if (!readingLog) {
      readingLog = new ReadingLog(book.userId);
    }

    // check if reading log date is the same as current date
    if (
      readingLog.date.getDate() === currentDate.getDate() &&
      readingLog.date.getMonth() === currentDate.getMonth() &&
      readingLog.date.getFullYear() === currentDate.getFullYear()
    ) {
      console.log("no streak update, already updated for today");
      next();
      return;
    }

    let diff = currentDate.getTime() - readingLog.date.getTime();
    let hh = Math.floor(diff / (1000 * 60 * 60));
    let mm = Math.floor(diff / (1000 * 60)) % 60;
    let ss = Math.floor(diff / 1000) % 60;

    console.log("hours since last", hh);
    console.log("current date", currentDate);
    console.log("reading log", readingLog.date);

    if (hh < 24) {
      console.log("no streak update");
    }
    // if user maintains consecutive activity - increment streak
    else if (hh > 24 && hh < 48) {
      const update = { streak: readingLog.streak + 1, date: new Date() };
      ReadingLog.findOneAndUpdate(user, update, options)
        .then((result) => {
          console.log("reading log update was successful");
        })
        .catch((error) => {
          console.log("An error occurred");
        });
    }
    // reset streak
    else {
      const update = { streak: 1, date: new Date() };
      ReadingLog.findOneAndUpdate(user, update, options)
        .then((result) => {
          console.log("reading log update was successful");
        })
        .catch((error) => {
          console.log("An error occurred");
        });
    }
  }
  next();
};
