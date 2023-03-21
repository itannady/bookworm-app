import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../book.model';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.css'],
})
export class BookModalComponent implements OnInit {
  @Input() bookData!: Book;
  selectedBook: any;
  bookAdded = false;
  @Output() close = new EventEmitter<void>();

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    console.log('MODAL', this.bookData);
  }

  onAddBook() {
    this.booksService.addBook(this.bookData);
    this.bookAdded = true;
  }

  onCloseClick() {
    document.body.classList.remove('modalOpen'); // remove the CSS class from the body
    this.close.emit();
  }
}
