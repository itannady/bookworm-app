import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Book } from '../book.model';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-bestseller-list',
  templateUrl: './bestseller-list.component.html',
  styleUrls: ['./bestseller-list.component.css'],
})
export class BestsellerListComponent implements OnInit, OnDestroy {
  isLoading = false;
  currentGroup = 0;
  displayedBooks = 5;
  bestsellers: Book[] = [];
  @Output() bookSelected = new EventEmitter<Book>();
  private booksSub: Subscription = new Subscription();

  constructor(
    private booksService: BooksService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.booksSub = this.booksService
      .getBestsellerBooks()
      .subscribe((result) => {
        this.bestsellers = result;
        this.isLoading = false;
      });
    // displays number of books based on screen size
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        if (
          result.breakpoints[Breakpoints.XSmall] ||
          result.breakpoints[Breakpoints.Small]
        ) {
          this.displayedBooks = 3;
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.displayedBooks = 4;
        }
        if (
          result.breakpoints[Breakpoints.Large] ||
          result.breakpoints[Breakpoints.XLarge]
        ) {
          this.displayedBooks = 5;
        }
      });
  }

  prevClick() {
    const nextIndex = this.currentGroup - this.displayedBooks;
    this.currentGroup =
      nextIndex < 0 ? this.bestsellers.length - this.displayedBooks : nextIndex;
  }

  nextClick() {
    this.currentGroup =
      (this.currentGroup + this.displayedBooks) % this.bestsellers.length;
  }

  get visibleBooks() {
    return this.bestsellers.slice(
      this.currentGroup,
      this.currentGroup + this.displayedBooks
    );
  }

  // opens book details modal
  onBookClick(book: Book) {
    this.bookSelected.emit(book);
    document.body.classList.add('modalOpen');
  }

  ngOnDestroy(): void {
    this.booksSub.unsubscribe();
  }
}
