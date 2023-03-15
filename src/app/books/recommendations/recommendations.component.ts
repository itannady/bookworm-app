import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from '../book.model';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css'],
})
export class RecommendationsComponent implements OnInit, OnDestroy {
  @Input() bookData!: Book;
  currentGroup = 0;
  recommendations: Book[] = [];
  private booksSub: Subscription = new Subscription();
  @Output() bookSelected = new EventEmitter<Book>();
  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    console.log('recommendations', this.bookData.title);
    this.booksSub = this.booksService
      .getRecommendedBooks(this.bookData)
      .subscribe(
        (result) => {
          console.log(result);
          this.recommendations = result;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  prevClick() {
    const nextIndex = this.currentGroup - 5;
    this.currentGroup =
      nextIndex < 0 ? this.recommendations.length - 5 : nextIndex;
  }

  nextClick() {
    this.currentGroup = (this.currentGroup + 5) % this.recommendations.length;
  }

  get visibleBooks() {
    return this.recommendations.slice(this.currentGroup, this.currentGroup + 5);
  }

  onBookClick(book: Book) {
    this.bookSelected.emit(book);
    document.body.classList.add('modalOpen'); // add the CSS class to the body
  }

  ngOnDestroy(): void {
    this.booksSub.unsubscribe();
  }
}
