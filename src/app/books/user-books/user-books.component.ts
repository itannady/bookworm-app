import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from '../book.model';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html',
  styleUrls: ['./user-books.component.css'],
})
export class UserBooksComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  private booksSub: Subscription = new Subscription();

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.booksService.getUserBooks();
    this.booksSub = this.booksService
      .getSelectedBooksListener()
      .subscribe((books) => {
        this.books = books;
        console.log(this.books);
      });
  }

  onDelete(bookId: string) {
    this.booksService.deleteBook(bookId);
  }

  ngOnDestroy(): void {
    this.booksSub.unsubscribe();
  }
}
