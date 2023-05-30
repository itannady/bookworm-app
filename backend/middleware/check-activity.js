const ReadingLog = require("../models/ReadingLog");

module.exports = async (req, res, next) => {
  const book = req.body;
  const user = { user: book.userId };
  const options = { new: true, upsert: true };

  // check if pagesRead is updated
  if (book.pagesRead) {
    let currentDate = new Date();

    // set the book's last update date to today
    book.lastUpdated = currentDate;

    // find the user's reading log
    let readingLog = await ReadingLog.findOne({
      user: book.userId,
    }).exec();
    // if log does not exist, create one
    if (!readingLog) {
      readingLog = new ReadingLog({ user: book.userId, date: currentDate });
      readingLog.streak = 1;
    }

    // set dates to string for day comparison
    const currentDateStr = currentDate.toISOString().slice(0, 10);
    const lastUpdated = readingLog.date.toISOString().slice(0, 10);

    // updates streak for new users
    if (currentDateStr == lastUpdated && readingLog.streak === 0) {
      const update = { streak: readingLog.streak + 1, date: currentDate };
      try {
        const result = await ReadingLog.findOneAndUpdate(user, update, options);
        readingLog.streak = result.streak;
      } catch (error) {}
    }

    // if update is not on the same day
    if (currentDateStr !== lastUpdated) {
      const oneDay = 24 * 60 * 60 * 1000;
      const diffInDays = Math.round(
        Math.abs((currentDate - readingLog.date) / oneDay)
      );

      // if user maintains consecutive activity - increment streak
      if (diffInDays === 1) {
        const update = { streak: readingLog.streak + 1, date: currentDate };
        try {
          const result = await ReadingLog.findOneAndUpdate(
            user,
            update,
            options
          );
          readingLog.streak = result.streak;
        } catch (error) {
          res.status(500).json({
            message: "An error occurred while updating reading log",
            error: error,
          });
        }
      } else if (diffInDays > 1) {
        const update = { streak: 1, date: currentDate };
        try {
          const result = await ReadingLog.findOneAndUpdate(
            user,
            update,
            options
          );
          readingLog.streak = result.streak;
        } catch (error) {
          res.status(500).json({
            message: "An error occurred while updating reading log",
            error: error,
          });
        }
      }
      // reset streak
      else {
        const update = { streak: 0, date: currentDate };
        try {
          const result = await ReadingLog.findOneAndUpdate(
            user,
            update,
            options
          );
          readingLog.streak = result.streak;
        } catch (error) {
          res.status(500).json({
            message: "An error occurred while updating reading log",
            error: error,
          });
        }
      }
    }
  }
  next();
};
