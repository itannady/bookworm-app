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
  @Output() close = new EventEmitter<void>();
  selectedBook: any;
  bookAdded = false;

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {}

  onAddBook() {
    this.booksService.addBook(this.bookData);
    this.bookAdded = true;
  }

  onCloseClick() {
    document.body.classList.remove('modalOpen');
    this.close.emit();
  }
}
