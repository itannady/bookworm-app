const ReadingLog = require("../models/ReadingLog");
const User = require("../models/User");

exports.getStreak = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    res.status(200).json({ streak: user.streak });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateReadingStreak = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const today = new Date().setHours(0, 0, 0, 0);
    let yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // find all reading logs for the user for the last two days
    const readingLogs = await ReadingLog.find({
      user: userId,
      date: { $gte: yesterday, $lte: today },
    });

    let streak = 0;
    let totalPagesRead = 0;

    // calculate the reading streak and total pages read
    for (let i = 0; i < readingLogs.length; i++) {
      const readingLog = readingLogs[i];
      if (readingLog.totalPages) {
        totalPagesRead += readingLog.totalPages;
      }
    }
    for (let i = readingLogs.length - 1; i >= 0; i--) {
      const readingLog = readingLogs[i];
      if (readingLog.totalPages) {
        streak++;
      } else {
        break;
      }
    }

    // Save the updated streak and total pages read in the user document
    await User.findByIdAndUpdate(userId, {
      $set: { readingStreak: streak, totalPagesRead: totalPagesRead },
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
