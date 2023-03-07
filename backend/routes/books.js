const express = require("express");
const BookController = require("../controllers/bookController");

const router = express.Router();

router.get("/search/:query", BookController.getBooks);
router.post("/library/", BookController.addBook);
router.get("/library", BookController.getBook);

module.exports = router;
