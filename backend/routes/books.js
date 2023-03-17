const express = require("express");
const BookController = require("../controllers/bookController");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

router.get("/library", checkAuth, BookController.getBooks);
router.get("/search/:query", BookController.getSearchedBooks);
router.get("/bestsellers", BookController.getBestsellerBooks);
router.get("/category", BookController.getCategoryBooks);
router.get("/recommendations/:title", BookController.getRecommendations);
router.post("/library/", checkAuth, BookController.addBook);
router.put("/library/update/:bookId", checkAuth, BookController.updateBook);
router.get("/library/update/:bookId", checkAuth, BookController.getUpdatedBook);
router.delete("/library/:id", checkAuth, BookController.deleteBook);

module.exports = router;
