import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../book.model';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  currentGroup = 0;
  books: Book[] = [];

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.booksService.getBooksListener().subscribe((books) => {
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
}
