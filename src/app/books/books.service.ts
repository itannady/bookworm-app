import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Book } from './book.model';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;

interface bookWithUserId extends Book {
  userId: string | null;
}
@Injectable({ providedIn: 'root' })
export class BooksService {
  private books: Book[] = [];
  private searchBooks = new BehaviorSubject<Book[]>([]);
  private selectedBooks = new BehaviorSubject<Book[]>([]);

  constructor(private http: HttpClient, private router: Router) {}

  // search books
  populateBooks(query: string) {
    this.http.get<Book[]>(`${API_URL}/search/${query}`).subscribe((result) => {
      this.searchBooks.next(result);
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
    this.http.post<{ book: Book }>(`${API_URL}/library`, book).subscribe(() => {
      this.selectedBooks.next([...this.books]);
    });
  }

  // get user's library list of books
  getUserBooks(userId: string) {
    return this.http
      .get<{ message: string; books: any }>(`${API_URL}/library`)
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
                lastUpdated: book.lastUpdated,
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
  updateBook(book: Partial<bookWithUserId>): Observable<any> {
    return this.http.put(`${API_URL}/library/update/${book.id}`, book);
  }

  // get bestseller list
  getBestsellerBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${API_URL}/bestsellers`);
  }

  // get non-fiction books for second carousel
  getCategoryBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${API_URL}/category`);
  }

  // delete book
  deleteBook(bookId: string) {
    this.http.delete(`${API_URL}/library/` + bookId).subscribe(() => {
      const updatedList = this.books.filter((book) => book.id !== bookId);
      this.books = updatedList;
      this.selectedBooks.next([...this.books]);
    });
  }
}
