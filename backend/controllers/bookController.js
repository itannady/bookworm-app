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
            totalPages: book.pageCount,
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
      `${BASE_URL}?q=bestseller&orderBy=newest&maxResults=30&key=${API_KEY}`
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

// save added book
exports.addBook = async (req, res, next) => {
  const bookData = req.body;
  const book = new Book({
    title: req.body.title,
    authors: req.body.authors,
    description: req.body.description,
    thumbnail: req.body.thumbnail,
    totalPages: req.body.totalPages,
    pagesRead: req.body.pagesRead,
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
