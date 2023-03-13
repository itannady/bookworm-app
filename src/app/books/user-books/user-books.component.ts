import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
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
  isLoading = false;
  userIsAuthenticated = false;
  userId: string | null = null;
  showProgressModal = false;
  private booksSub: Subscription = new Subscription();
  private authStatusSub: Subscription = new Subscription();

  constructor(
    private booksService: BooksService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.booksService.getUserBooks();
    this.booksSub = this.booksService
      .getSelectedBooksListener()
      .subscribe((books) => {
        this.isLoading = false;
        this.books = books;
        console.log(this.books);
      });
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
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
