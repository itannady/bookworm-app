const express = require("express");
const BookController = require("../controllers/bookController");
const checkAuth = require("../middleware/check-auth");
const checkActivity = require("../middleware/check-activity");
const router = express.Router();

router.get("/library", checkAuth, BookController.getBooks);
router.get("/search/:query", BookController.getSearchedBooks);
router.get("/bestsellers", BookController.getBestsellerBooks);
router.get("/category", BookController.getCategoryBooks);
router.post("/library/", checkAuth, BookController.addBook);
router.put(
  "/library/update/:bookId",
  checkAuth,
  checkActivity,
  BookController.updateBook
);
router.delete("/library/:id", checkAuth, BookController.deleteBook);

module.exports = router;
