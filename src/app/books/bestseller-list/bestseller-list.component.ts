import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
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
  bestsellers: Book[] = [];
  @Output() bookSelected = new EventEmitter<Book>();
  private booksSub: Subscription = new Subscription();

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.booksSub = this.booksService
      .getBestsellerBooks()
      .subscribe((result) => {
        this.bestsellers = result;
        this.isLoading = false;
      });
  }

  prevClick() {
    const nextIndex = this.currentGroup - 5;
    this.currentGroup = nextIndex < 0 ? this.bestsellers.length - 5 : nextIndex;
  }

  nextClick() {
    this.currentGroup = (this.currentGroup + 5) % this.bestsellers.length;
  }

  get visibleBooks() {
    return this.bestsellers.slice(this.currentGroup, this.currentGroup + 5);
  }

  onBookClick(book: Book) {
    this.bookSelected.emit(book);
    document.body.classList.add('modalOpen');
  }

  ngOnDestroy(): void {
    this.booksSub.unsubscribe();
  }
}
