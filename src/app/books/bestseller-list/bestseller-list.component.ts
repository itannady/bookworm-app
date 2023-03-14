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
  constructor(private booksService: BooksService) {}
  private booksSub: Subscription = new Subscription();

  ngOnInit(): void {
    this.isLoading = true;
    this.booksSub = this.booksService
      .getBestsellerBooks()
      .subscribe((result) => {
        this.isLoading = false;
        this.bestsellers = result;
        console.log(result);
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
  }

  ngOnDestroy(): void {
    this.booksSub.unsubscribe();
  }
}
