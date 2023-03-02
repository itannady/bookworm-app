const axios = require("axios");
const Book = require("../models/Book");
const BASE_URL = "https://www.googleapis.com/books/v1/volumes";
require("dotenv").config();
const API_KEY = process.env.API_KEY;

// search for books
exports.getBooks = async (req, res, next) => {
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
