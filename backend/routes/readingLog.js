const express = require("express");
const readingLogController = require("../controllers/readingLogController");
const router = express.Router();

router.get("/streak/:userId", readingLogController.getStreak);
router.get("/total-books/:userId/:month", readingLogController.getTotalBooks);

module.exports = router;
