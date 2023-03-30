const express = require("express");
const readingLogController = require("../controllers/readingLogController");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

router.get("/streak/:userId", readingLogController.getStreak);
// router.post("/update-streak", readingLogController.updateReadingStreak);

module.exports = router;
