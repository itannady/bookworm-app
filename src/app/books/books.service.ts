import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Book } from './book.model';
import { BehaviorSubject, map, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BooksService {
  private books: Book[] = [];
  private searchBooks = new BehaviorSubject<Book[]>([]);
  private selectedBooks = new BehaviorSubject<Book[]>([]);

  API_URL = 'http://localhost:5040';

  constructor(private http: HttpClient, private router: Router) {}

  populateBooks(query: string) {
    this.http
      .get<Book[]>(`${this.API_URL}/search/${query}`)
      .subscribe((result) => {
        this.searchBooks.next(result);
        console.log(result);
      });
  }

  getBooksListener() {
    return this.searchBooks.asObservable();
  }

  getSelectedBooksListener() {
    return this.selectedBooks.asObservable();
  }

  addBook(book: Book) {
    this.http
      .post<{ book: Book }>(`${this.API_URL}/library`, book)
      .subscribe(() => {
        // const currentValue = this.selectedBooks.getValue();
        // const updatedValue = [...currentValue, book];
        this.selectedBooks.next([...this.books]);
      });
  }

  getUserBooks() {
    return this.http
      .get<{ message: string; books: any }>(`${this.API_URL}/library`)
      .pipe(
        map((bookData) => {
          return bookData.books.map((book: any) => {
            return {
              id: book._id,
              title: book.title,
              authors: book.authors,
              thumbnail: book.thumbnail,
            };
          });
        })
      )
      .subscribe((savedBooks) => {
        this.books = savedBooks;
        this.selectedBooks.next([...this.books]);
      });
  }

  deleteBook(bookId: string) {
    this.http.delete(`${this.API_URL}/library/` + bookId).subscribe(() => {
      const updatedList = this.books.filter((book) => book.id !== bookId);
      this.books = updatedList;
      this.selectedBooks.next([...this.books]);
    });
  }
}
