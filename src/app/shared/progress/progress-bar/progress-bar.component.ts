import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/books/book.model';
import { BooksService } from 'src/app/books/books.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
})
export class ProgressBarComponent implements OnInit {
  showProgressModal = false;
  progress: number = 0;
  @Input() book!: Book;

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    const { pagesRead, totalPages } = this.book;
    // if there's book progress
    if (pagesRead !== undefined && totalPages !== undefined) {
      this.progress = Math.min((pagesRead / totalPages) * 100, 100);
      if (this.progress >= 100) {
        this.book.status = 'Have Read';
        this.booksService
          .updateBook({ id: this.book.id, status: this.book.status })
          .subscribe((res) => {
            this.book.status = res.book.status;
          });
      } else if (this.progress > 0) {
        this.book.status = 'Reading Now';
        this.booksService
          .updateBook({ id: this.book.id, status: this.book.status })
          .subscribe((res) => {
            this.book.status = res.book.status;
          });
      }
    }
  }

  updateProgress(progress: number) {
    this.progress = progress;
  }
}
