const Book = require("../models/Book");
const ReadingLog = require("../models/ReadingLog");

module.exports = async (req, res, next) => {
  const book = req.body;
  const user = { user: book.userId };
  const options = { new: true, upsert: true };

  // check if pagesRead is updated
  if (book.pagesRead) {
    let currentDate = new Date();

    book.lastUpdated = currentDate;

    let readingLog = await ReadingLog.findOne({
      user: book.userId,
    }).exec();
    if (!readingLog) {
      readingLog = new ReadingLog({ user: book.userId, date: currentDate });
      readingLog.streak = 1;
    }

    // check if reading log date is the same as current date
    // if (
    //   readingLog.date.getDate() === currentDate.getDate() &&
    //   readingLog.date.getMonth() === currentDate.getMonth() &&
    //   readingLog.date.getFullYear() === currentDate.getFullYear()
    // ) {
    //   console.log("no streak update, already updated for today");
    //   next();
    //   return;
    // }

    const diff = currentDate.getTime() - readingLog.date.getTime();
    const hoursSinceLast = Math.floor(diff / (1000 * 60 * 60));
    // let diff = currentDate.getTime() - readingLog.date.getTime();
    // let hh = Math.floor(diff / (1000 * 60 * 60));
    // let mm = Math.floor(diff / (1000 * 60)) % 60;
    // let ss = Math.floor(diff / 1000) % 60;

    console.log("hours since last", hoursSinceLast);
    console.log("current date", currentDate);
    console.log("reading log", readingLog.date);

    if (hoursSinceLast < 24) {
      console.log("no streak update");
      next();
    }
    // if user maintains consecutive activity - increment streak
    else if (hoursSinceLast > 24 && hoursSinceLast < 48) {
      const update = { streak: readingLog.streak + 1, date: currentDate };
      await ReadingLog.findOneAndUpdate(user, update, options)
        .then((result) => {
          readingLog.streak = result.streak;
          console.log("reading log streak maintained");
        })
        .catch((error) => {
          console.log("An error occurred");
        });
    } else if (readingLog.streak === 0 && hoursSinceLast > 48) {
      const update = { streak: 1, date: new Date() };
      await ReadingLog.findOneAndUpdate(user, update, options)
        .then((result) => {
          readingLog.streak = result.streak;
          console.log("reading log update was successful");
        })
        .catch((error) => {
          console.log("An error occurred");
        });
    }
    // reset streak
    else {
      const update = { streak: 0, date: new Date() };
      await ReadingLog.findOneAndUpdate(user, update, options)
        .then((result) => {
          readingLog.streak = result.streak;
          console.log("reading log update was successful");
        })
        .catch((error) => {
          console.log("An error occurred");
        });
    }
  }
  next();
};
