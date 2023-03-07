import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from '../book.model';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html',
  styleUrls: ['./user-books.component.css'],
})
export class UserBooksComponent implements OnInit, OnDestroy {
  @Output() bookSelected = new EventEmitter<Book>();
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

  onBookClick(book: Book) {
    console.log(book);
    this.bookSelected.emit(book);
  }

  ngOnDestroy(): void {
    this.booksSub.unsubscribe();
  }
}
