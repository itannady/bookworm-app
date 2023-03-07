const express = require("express");
const BookController = require("../controllers/bookController");

const router = express.Router();

router.get("/library", BookController.getBooks);
router.get("/search/:query", BookController.getSearchedBooks);
router.post("/library/", BookController.addBook);

module.exports = router;
