import {
  Component,
  EventEmitter,
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
  isLoading = false;
  books: Book[] = [];
  selectedBook: Book | null = null;
  userIsAuthenticated = false;
  userId: string | null = null;
  showProgressModal = false;
  showNotesModal = false;
  filter: string = 'All';
  @Output() bookSelected = new EventEmitter<Book>();
  private booksSub: Subscription = new Subscription();
  private authStatusSub: Subscription = new Subscription();

  constructor(
    private booksService: BooksService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
    if (this.userId !== null) {
      this.booksService.getUserBooks(this.userId);
    }
    this.booksSub = this.booksService
      .getSelectedBooksListener()
      .subscribe((books) => {
        this.isLoading = false;
        this.books = books;
      });
  }

  // shows books based on filter
  setFilter(status: string) {
    this.filter = status;
  }

  // shows all books
  getFilteredBooks(filter: string): Book[] {
    if (filter === 'All') {
      return this.books;
    } else {
      return this.books.filter((book) => book.status === filter);
    }
  }

  onDelete(bookId: string) {
    this.booksService.deleteBook(bookId);
  }

  onBookClick(book: Book) {
    document.body.classList.add('modalOpen');
    this.bookSelected.emit(book);
  }

  onNotesClick(book: Book) {
    document.body.classList.add('modalOpen');
    this.selectedBook = book;
    this.showNotesModal = true;
  }

  ngOnDestroy(): void {
    this.booksSub.unsubscribe();
  }
}
