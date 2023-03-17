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
  selectedBook: Book | null = null;
  isLoading = false;
  userIsAuthenticated = false;
  userId: string | null = null;
  showProgressModal = false;
  showNotesModal = false;
  filter: string = 'All';
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
        this.books = books;
        this.isLoading = false;
      });
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  setFilter(status: string) {
    this.filter = status;
  }

  getFilteredBooks(filter: string): Book[] {
    // let sortedBooks = this.books.sort((a, b) => {
    //   if (a.status === 'Reading Now' && b.status !== 'Reading Now') {
    //     return -1;
    //   } else if (a.status !== 'Reading Now' && b.status === 'Reading Now') {
    //     return 1;
    //   } else if (a.status === 'To Read' && b.status !== 'To Read') {
    //     return -1;
    //   } else if (a.status !== 'To Read' && b.status === 'To Read') {
    //     return 1;
    //   } else {
    //     return 0;
    //   }
    // });
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
    console.log(book);
    this.bookSelected.emit(book);
  }

  onNotesClick(book: Book) {
    this.selectedBook = book;
    this.showNotesModal = true;
  }
  ngOnDestroy(): void {
    this.booksSub.unsubscribe();
  }
}
