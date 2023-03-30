import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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
  isLoading = false;
  books: Book[] = [];
  selectedBook: Book | null = null;
  userIsAuthenticated = false;
  userId: string | null = null;
  showProgressModal = false;
  showNotesModal = false;
  filter: string = 'All';
  currentIndex = 0;
  @Output() bookSelected = new EventEmitter<Book>();
  private booksSub: Subscription = new Subscription();
  private authStatusSub: Subscription = new Subscription();
  constructor(
    private booksService: BooksService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
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
        this.books = books.filter((book) => book.status === 'Reading Now');
        console.log('user books', this.books);
      });
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

  prevBook() {
    this.currentIndex--;
  }

  nextBook() {
    this.currentIndex++;
  }

  ngOnDestroy(): void {
    this.booksSub.unsubscribe();
  }
}
