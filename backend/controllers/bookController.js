const axios = require("axios");
const Book = require("../models/Book");
const ReadingLog = require("../models/ReadingLog");
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
    res
      .status(500)
      .json({ message: "An error occurred while searching for books." });
  }
};

// get bestseller books
exports.getBestsellerBooks = async (req, res, next) => {
  try {
    const result = await axios.get(
      `${BASE_URL}?q=popular+books&orderBy=relevance&maxResults=40&key=${API_KEY}&printType=books`
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
    res.status(500).json({ message: "Failed to get bestsellers" });
  }
};

// get top rated non-fiction books
exports.getCategoryBooks = async (req, res, next) => {
  try {
    const result = await axios.get(
      `${BASE_URL}?q=best+selling+nonfiction&orderBy=relevance&maxResults=40&key=${API_KEY}&printType=books`
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
    res.status(500).json({ message: "Failed to get fiction" });
  }
};

// add book
exports.addBook = async (req, res, next) => {
  try {
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
    const addedBook = await book.save();
    res.status(201).json({
      message: "Book added successfully",
      book: {
        ...addedBook,
        id: addedBook._id,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while adding book",
    });
  }
};

// update book (for notes or progress)
exports.updateBook = async (req, res, next) => {
  try {
    const book = req.body;
    const bookId = req.params.bookId;

    const result = await Book.findByIdAndUpdate(bookId, book, { new: true });

    console.log("update", result);
    res
      .status(200)
      .json({ message: "Book updated successfully", book: result });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating book",
      error: error,
    });
  }
};

// get user books
exports.getBooks = async (req, res, next) => {
  try {
    const savedBooks = await Book.find();
    res.status(200).json({
      message: "Books fetched successfully",
      books: savedBooks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fetching books failed",
      error: error,
    });
  }
};

// delete book
exports.deleteBook = async (req, res, next) => {
  try {
    const result = await Book.deleteOne({
      _id: req.params.id,
      user: req.userData.userId,
    });
    if (result.n > 0) {
      res.status(200).json({
        message: "Deletion successful",
      });
    } else {
      res.status(200).json({
        message: "Not authorized",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting book",
    });
  }
};
