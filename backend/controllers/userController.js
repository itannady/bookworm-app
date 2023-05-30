const bcrypt = require("bcryptjs");
const ReadingLog = require("../models/ReadingLog");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const User = require("../models/User");

exports.createUser = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    });
    const result = await user.save();

    let readingLog = await ReadingLog.findOne({
      user: result._id,
    }).exec();
    // create reading log for user
    if (!readingLog) {
      readingLog = new ReadingLog({ user: result._id });
      await readingLog.save();
    }
    res.status(201).json({
      message: "User created",
      result: result,
    });
  } catch (err) {
    res.status(500).json({
      message:
        "Sorry, this email is already in use. Please try again with a different email address or log in if you already have an account.",
    });
  }
};

exports.userLogin = async (req, res, next) => {
  let fetchedUser;
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({
        message:
          "Invalid login credentials. Please check your email or password and try again.",
      });
    }
    fetchedUser = user;
    const result = await bcrypt.compare(req.body.password, user.password);
    if (!result) {
      return res.status(401).json({
        message:
          "Invalid login credentials. Please check your email or password and try again.",
      });
    }
    const token = jwt.sign(
      {
        email: fetchedUser.email,
        userId: fetchedUser._id,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: fetchedUser._id,
      name: fetchedUser.name,
    });
  } catch (err) {
    return res.status(401).json({
      message:
        "Invalid login credentials. Please check your email or password and try again.",
    });
  }
};
