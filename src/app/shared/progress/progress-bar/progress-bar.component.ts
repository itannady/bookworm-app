import { Component, OnInit, Input, Output } from '@angular/core';
import { Book } from 'src/app/books/book.model';
import { BooksService } from 'src/app/books/books.service';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
})
export class ProgressBarComponent implements OnInit {
  @Input() book!: Book;
  isModalOpen = false;
  showProgressModal = false;
  progress: number = 0;

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    const { pagesRead, totalPages } = this.book;
    if (pagesRead !== undefined && totalPages !== undefined) {
      this.progress = (pagesRead / totalPages) * 100;
    }
    // this.booksService.getUpdatedBook(this.book).subscribe((bookData) => {
    //   this.book = { ...this.book, pagesRead: bookData.pagesRead };
    // });
  }

  updateProgress(progress: number) {
    this.progress = progress;
    console.log(this.progress);
  }

  showModal() {
    this.showProgressModal = true;
  }
}
