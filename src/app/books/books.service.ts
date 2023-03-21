import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Book } from './book.model';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BooksService {
  private books: Book[] = [];
  private searchBooks = new BehaviorSubject<Book[]>([]);
  private selectedBooks = new BehaviorSubject<Book[]>([]);

  API_URL = 'http://localhost:5040';

  constructor(private http: HttpClient, private router: Router) {}

  // search books
  populateBooks(query: string) {
    this.http
      .get<Book[]>(`${this.API_URL}/search/${query}`)
      .subscribe((result) => {
        this.searchBooks.next(result);
        console.log(result);
      });
  }

  // search book observable
  getBooksListener() {
    return this.searchBooks.asObservable();
  }

  // selected book observable
  getSelectedBooksListener() {
    return this.selectedBooks.asObservable();
  }

  // add book
  addBook(book: Book) {
    this.http
      .post<{ book: Book }>(`${this.API_URL}/library`, book)
      .subscribe(() => {
        // const currentValue = this.selectedBooks.getValue();
        // const updatedValue = [...currentValue, book];
        this.selectedBooks.next([...this.books]);
      });
  }

  // get library list of books
  getUserBooks(userId: string) {
    return this.http
      .get<{ message: string; books: any }>(`${this.API_URL}/library`)
      .pipe(
        map((bookData) => {
          return bookData.books
            .filter((book: any) => book.user === userId)
            .map((book: any) => {
              return {
                id: book._id,
                title: book.title,
                authors: book.authors,
                thumbnail: book.thumbnail,
                description: book.description,
                categories: book.categories,
                ratingsCount: book.ratingsCount,
                averageRating: book.averageRating,
                totalPages: book.totalPages,
                pagesRead: book.pagesRead,
                status: book.status,
                notes: book.notes,
                user: book.user,
              };
            });
        })
      )
      .subscribe((savedBooks) => {
        this.books = savedBooks;
        this.selectedBooks.next([...this.books]);
      });
  }

  // update book
  updateBook(book: Partial<Book>): Observable<any> {
    return this.http.put(`${this.API_URL}/library/update/${book.id}`, book);
  }

  // get updated book
  getUpdatedBook(book: Book) {
    return this.http.get<{ pagesRead: number }>(
      `${this.API_URL}/library/update/${book.id}`
    );
  }

  // get bestseller list
  getBestsellerBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.API_URL}/bestsellers`);
  }

  // get books for second carousel
  getCategoryBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.API_URL}/category`);
  }

  // get recommendations
  getRecommendedBooks(book: Book): Observable<Book[]> {
    return this.http.get<Book[]>(
      `${this.API_URL}/recommendations/${book.title}`
    );
  }

  // delete book
  deleteBook(bookId: string) {
    this.http.delete(`${this.API_URL}/library/` + bookId).subscribe(() => {
      const updatedList = this.books.filter((book) => book.id !== bookId);
      this.books = updatedList;
      this.selectedBooks.next([...this.books]);
    });
  }
}
