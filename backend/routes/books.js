const express = require("express");
const BookController = require("../controllers/bookController");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

router.get("/library", checkAuth, BookController.getBooks);
router.get("/search/:query", BookController.getSearchedBooks);
router.post("/library/", checkAuth, BookController.addBook);
router.delete("/library/:id", checkAuth, BookController.deleteBook);

module.exports = router;
