import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Book } from 'src/app/books/book.model';
import { BooksService } from 'src/app/books/books.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
})
export class ProgressBarComponent implements OnInit {
  @Input() book!: Book;
  @Output() updateStreak = new EventEmitter<boolean>();
  currentPage: string = this.router.url;
  showProgressModal = false;
  progress: number = 0;

  constructor(private booksService: BooksService, private router: Router) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.currentPage = val.url;
      }
    });
  }

  ngOnInit(): void {
    const { pagesRead, totalPages } = this.book;
    // if there's book progress
    if (pagesRead !== undefined && totalPages !== undefined) {
      this.progress = Math.min((pagesRead / totalPages) * 100, 100);
      if (this.progress >= 100) {
        this.book.status = 'Have Read';
      } else if (this.progress > 0) {
        this.book.status = 'Reading Now';
      }
    }
  }

  getCurrentProgressClass() {
    return this.currentPage == '/' ? 'widgetProgress' : 'libraryProgress';
  }

  updateStreakEvent(value: boolean) {
    this.updateStreak.emit(value);
  }

  updateProgress(progress: number) {
    this.progress = progress;
  }
}
