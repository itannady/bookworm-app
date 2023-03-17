const axios = require("axios");
const Book = require("../models/Book");
const BASE_URL = "https://www.googleapis.com/books/v1/volumes";
require("dotenv").config();
const API_KEY = process.env.API_KEY;

// search for books
exports.getSearchedBooks = async (req, res, next) => {
  const { query } = req.params;
  try {
    let books = [];
    let counter = 0;

    // request books until we have enough unique books
    while (books.length < 20 && counter < 2) {
      // search for books
      const result = await axios.get(
        `${BASE_URL}?q=:${query}&key=${API_KEY}&startIndex=${
          counter * 20
        }&maxResults=20&printType=books&filter=partial`
      );
      for (let item of result.data.items) {
        const book = item.volumeInfo;
        const title = book.title.toLowerCase();

        // check if book is duplicate
        const isDuplicate = books.some((b) => b.title.toLowerCase() === title);

        if (!isDuplicate) {
          books.push({
            title: book.title,
            authors: book.authors,
            description: book.description,
            thumbnail: book.imageLinks?.thumbnail,
            categories: book.categories,
            averageRating: book.averageRating,
            ratingsCount: book.ratingsCount,
            totalPages: book.pageCount,
            pagesRead: book.pagesRead,
          });
        }
        // stop once enough books have been reached
        if (books.length >= 20) {
          break;
        }
      }
      counter++;
    }

    res.status(200).json(books);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occurred while searching for books." });
  }
};

// get bestseller books
exports.getBestsellerBooks = async (req, res, next) => {
  try {
    const result = await axios.get(
      `${BASE_URL}?q=popularbooks&orderBy=relevance&maxResults=40&key=${API_KEY}&printType=books`
    );
    const booksData = result.data.items;
    const bestSellers = [];

    for (let bookData of booksData) {
      // Only add the book to the list if it has a pageCount property
      if (bookData.volumeInfo.pageCount && bookData.volumeInfo.pageCount > 0) {
        const book = new Book({
          title: bookData.volumeInfo.title,
          authors: bookData.volumeInfo.authors,
          description: bookData.volumeInfo.description,
          thumbnail: bookData.volumeInfo.imageLinks?.thumbnail,
          categories: bookData.volumeInfo.categories,
          averageRating: bookData.volumeInfo.averageRating,
          ratingsCount: bookData.volumeInfo.ratingsCount,
          totalPages: bookData.volumeInfo.pageCount,
          pagesRead: bookData.volumeInfo.pagesRead,
        });
        bestSellers.push(book);
      }
    }
    res.status(200).json(bestSellers.slice(0, 20));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get bestsellers" });
  }
};

// get top rated fiction books
exports.getFictionBooks = async (req, res, next) => {
  try {
    const result = await axios.get(
      `${BASE_URL}?q=topratedfiction&orderBy=relevance&maxResults=40&key=${API_KEY}&printType=books`
    );
    const booksData = result.data.items;
    const fictionBooks = [];

    for (let bookData of booksData) {
      // Only add the book to the list if it has a pageCount property
      if (bookData.volumeInfo.pageCount && bookData.volumeInfo.pageCount > 0) {
        const book = new Book({
          title: bookData.volumeInfo.title,
          authors: bookData.volumeInfo.authors,
          description: bookData.volumeInfo.description,
          thumbnail: bookData.volumeInfo.imageLinks?.thumbnail,
          categories: bookData.volumeInfo.categories,
          averageRating: bookData.volumeInfo.averageRating,
          ratingsCount: bookData.volumeInfo.ratingsCount,
          totalPages: bookData.volumeInfo.pageCount,
          pagesRead: bookData.volumeInfo.pagesRead,
        });
        fictionBooks.push(book);
      }
    }
    res.status(200).json(fictionBooks.slice(0, 20));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get bestsellers" });
  }
};

// get book recommendations
exports.getRecommendations = async (req, res, next) => {
  try {
    const title = req.params.title;

    const result = await axios.get(
      `${BASE_URL}?q=related:${title}&orderBy=relevance&newest&key=${API_KEY}&maxResults=5&printType=books`
    );
    const booksData = result.data.items;
    const recommendations = [];

    for (let bookData of booksData) {
      const book = new Book({
        title: bookData.volumeInfo.title,
        authors: bookData.volumeInfo.authors,
        description: bookData.volumeInfo.description,
        thumbnail: bookData.volumeInfo.imageLinks?.thumbnail,
        categories: bookData.volumeInfo.categories,
        averageRating: bookData.volumeInfo.averageRating,
        ratingsCount: bookData.volumeInfo.ratingsCount,
        totalPages: bookData.volumeInfo.pageCount,
        pagesRead: bookData.volumeInfo.pagesRead,
      });
      recommendations.push(book);
    }
    res.status(200).json(recommendations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get recommendations" });
  }
};

// save added book
exports.addBook = async (req, res, next) => {
  // const bookData = req.body;
  const book = new Book({
    title: req.body.title,
    authors: req.body.authors,
    description: req.body.description,
    thumbnail: req.body.thumbnail,
    categories: req.body.categories,
    averageRating: req.body.averageRating,
    ratingsCount: req.body.ratingsCount,
    totalPages: req.body.totalPages,
    pagesRead: req.body.pagesRead,
    status: req.body.status,
    notes: req.body.notes,
    user: req.userData.userId,
  });
  book
    .save()
    .then((addedBook) => {
      res.status(201).json({
        message: "Book added successfully",
        book: {
          ...addedBook,
          id: addedBook._id,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Creating a post failed!",
      });
    });
};

// update book
exports.updateBook = (req, res, next) => {
  const book = req.body;
  const bookId = req.params.bookId;
  Book.findByIdAndUpdate(bookId, book, { new: "true" })
    .then((result) => {
      res
        .status(200)
        .json({ message: "Book updated successfully", book: result });
    })
    .catch((error) => {
      res.status(500).json({ message: "Update book failed", error: error });
    });
};

// get updated book
exports.getUpdatedBook = (req, res, next) => {
  const bookId = req.params.bookId;
  Book.findById(bookId).then((book) => {
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  });
};

// get saved books
exports.getBooks = (req, res, next) => {
  Book.find()
    .then((savedBooks) => {
      res.status(200).json({
        message: "Books fetched successfully",
        books: savedBooks,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching books failed!",
        error: error,
      });
    });
};

exports.deleteBook = (req, res, next) => {
  Book.deleteOne({ _id: req.params.id, user: req.userData.userId }).then(
    (result) => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({
          message: "Deletion successful",
        });
      } else {
        res.status(200).json({
          message: "Not authorized",
        });
      }
    }
  );
};
