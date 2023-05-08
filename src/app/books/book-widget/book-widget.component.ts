import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Book } from '../book.model';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-book-widget',
  templateUrl: './book-widget.component.html',
  styleUrls: ['./book-widget.component.css'],
})
export class BookWidgetComponent implements OnInit {
  @Output() bookSelected = new EventEmitter<Book>();
  @Output() shouldReloadEvent = new EventEmitter<boolean>();
  isLoading = false;
  shouldReload = false;
  books: Book[] = [];
  selectedBook: Book | null = null;
  userIsAuthenticated = false;
  userId: string | null = null;
  showProgressModal = false;
  showNotesModal = false;
  filter: string = 'All';
  currentIndex = 0;
  updateStreak = new EventEmitter<boolean>();
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
        this.books = books.filter((book) => book.status === 'Reading Now');
        this.isLoading = false;
      });
  }

  onBookClick(book: Book) {
    document.body.classList.add('modalOpen');
    this.bookSelected.emit(book);
  }

  nextBook() {
    if (this.currentIndex === this.books.length - 1) {
      // start the carousel from the beginning
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
  }

  handleUpdateStreak(value: boolean) {
    this.shouldReload = value;
    this.shouldReloadEvent.emit(this.shouldReload);
  }

  ngOnDestroy(): void {
    this.booksSub.unsubscribe();
  }
}
