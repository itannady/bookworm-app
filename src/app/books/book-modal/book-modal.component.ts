import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.css'],
})
export class BookModalComponent implements OnInit {
  @Input() bookData!: Book;
  @Output() close = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onCloseClick() {
    this.close.emit();
  }
}
