const express = require("express");
const readingLogController = require("../controllers/readingLogController");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

router.get("/streak/:userId", readingLogController.getStreak);
router.get("/total-pages/:userId/:month", readingLogController.getTotalPages);

module.exports = router;
