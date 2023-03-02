const express = require("express");
const BookController = require("../controllers/bookController");

const router = express.Router();

router.get("/search/:query", BookController.getBooks);

module.exports = router;
