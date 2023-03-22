import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() query: string = '';
  @Output() bookSelected = new EventEmitter<Book>();
  @Output() close = new EventEmitter<void>();

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.booksService.getBooksListener().subscribe((books) => {
      this.isLoading = false;
      this.books = books;
    });
  }

  onBookClick(book: Book) {
    this.bookSelected.emit(book);
  }

  onCloseClick() {
    document.body.classList.remove('modalOpen');
    this.close.emit();
  }
}
