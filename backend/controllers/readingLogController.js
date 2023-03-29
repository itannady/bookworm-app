const Book = require("../models/Book");
const ReadingLog = require("../models/ReadingLog");
const User = require("../models/User");

exports.getTotalPages = async (req, res, next) => {
  let streak = 0;

  let today = new Date();
  let yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  let updatedToday = false;
  let updatedYesterday = false;

  console.log("today", today.toLocaleString());
  console.log("yesterday", yesterday.toLocaleString());

  let readingLog = await ReadingLog.findOne({ user: req.params.userId }).exec();
  if (!readingLog) {
    readingLog = new ReadingLog(user);
  }
  console.log("reading log", readingLog.date.toLocaleString());

  const books = await Book.find({ user: req.params.userId }).exec();
  // books.sort((a, b) => b.lastUpdated - a.lastUpdated);

  books.forEach((book) => {
    if (book.lastUpdated >= yesterday && book.pagesRead > 0) {
      if (book.lastUpdated >= today) {
        if (!updatedToday) {
          streak++;
          updatedToday = true;
          // Update reading log date if streak was incremented
          readingLog.date = new Date();
        }
      } else if (book.lastUpdated >= yesterday) {
        if (!updatedYesterday) {
          if (readingLog.lastUpdated && readingLog.lastUpdated >= yesterday) {
            streak++;
            // Update reading log date if streak was incremented
            readingLog.date = new Date();
          } else {
            streak = 0;
          }
          updatedYesterday = true;
        }
      }
    }
  });

  const user = { user: req.params.userId };
  // const update = { totalPagesRead: totalPagesRead };
  const update = { streak: streak, date: readingLog.date };
  const options = { new: true, upsert: true };
  ReadingLog.findOneAndUpdate(user, update, options)
    .then((result) => {
      res.status(200).json({
        message: "Total pages updated successfully",
        streak: result.streak,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred while updating reading log",
        error: error,
      });
    });
};

// const compareDates = (userDate: Date, todayDate: Date) => {
//   if (remainingTime !== undefined) {
//     return;
//   }

//   var diff = todayDate.getTime() - userDate.getTime();

//   var msec = diff;
//   var hh = Math.floor(msec / 1000 / 60 / 60);
//   msec -= hh * 1000 * 60 * 60;
//   var mm = Math.floor(msec / 1000 / 60);
//   msec -= mm * 1000 * 60;
//   var ss = Math.floor(msec / 1000);
//   msec -= ss * 1000;

//   if (hh < 12) {
//     setRemainingTime(12 - hh);
//   }
// };

// if (lastUserWinkDate)
