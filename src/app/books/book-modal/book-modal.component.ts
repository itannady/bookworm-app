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

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {}

  onAddBook() {
    this.booksService.addBook(this.bookData);
    console.log('on add book', this.bookData);
  }

  onCloseClick() {
    this.close.emit();
  }
}
