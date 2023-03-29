const express = require("express");
const readingLogController = require("../controllers/readingLogController");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

router.get("/total-pages/:userId", readingLogController.getTotalPages);
// router.post("/update-streak", readingLogController.updateReadingStreak);

module.exports = router;
