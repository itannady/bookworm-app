const Book = require("../models/Book");
const ReadingLog = require("../models/ReadingLog");

module.exports = async (req, res, next) => {
  const book = req.body;
  const bookId = req.params.bookId;

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

    let diff = currentDate - readingLog.date;

    let msec = diff;
    let hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    let mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    let ss = Math.floor(msec / 1000);
    msec -= ss * 1000;

    console.log("hours since last", hh);
    console.log("current date", currentDate);
    console.log("reading log", readingLog.date);

    const user = { user: book.userId };

    const options = { new: true, upsert: true };

    if (hh < 24) {
      console.log("no streak update");
    } else if (hh > 24 && hh < 48) {
      const update = { streak: readingLog.streak + 1, date: new Date() };
      ReadingLog.findOneAndUpdate(user, update, options)
        .then((result) => {
          console.log("reading log update was successful");
        })
        .catch((error) => {
          console.log("An error occurred");
        });
    } else {
      // reset streak
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
