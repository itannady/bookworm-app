import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Book } from './book.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BooksService {
  private books = new BehaviorSubject<Book[]>([]);
  private selectedBooks = new BehaviorSubject<Book[]>([]);

  API_URL = 'http://localhost:5040';

  constructor(private http: HttpClient, private router: Router) {}

  populateBooks(query: string) {
    this.http
      .get<Book[]>(`${this.API_URL}/search/${query}`)
      .subscribe((result) => {
        this.books.next(result);
        console.log(result);
      });
  }
  getBooksListener() {
    return this.books.asObservable();
  }

  getSelectedBooksListener() {
    return this.selectedBooks.asObservable();
  }

  addBook(book: Book) {
    const currentValue = this.selectedBooks.getValue();
    const updatedValue = [...currentValue, book];
    this.selectedBooks.next(updatedValue);
  }
}
