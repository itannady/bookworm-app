import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Book } from '../book.model';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  isLoading = true;
  currentGroup = 0;
  books: Book[] = [];
  @Output() bookSelected = new EventEmitter<Book>();
  @Output() close = new EventEmitter<void>();
  @Input() query: string = '';
  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.booksService.getBooksListener().subscribe((books) => {
      this.isLoading = false;
      this.books = books;
    });
  }

  prevClick() {
    const nextIndex = this.currentGroup - 5;
    this.currentGroup = nextIndex < 0 ? this.books.length - 5 : nextIndex;
  }

  nextClick() {
    this.currentGroup = (this.currentGroup + 5) % this.books.length;
  }

  get visibleBooks() {
    return this.books.slice(this.currentGroup, this.currentGroup + 5);
  }

  onBookClick(book: Book) {
    this.bookSelected.emit(book);
  }

  onCloseClick() {
    document.body.classList.remove('modalOpen'); // remove the CSS class from the body
    this.close.emit();
  }
}
