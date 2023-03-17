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
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  isLoading = false;
  currentGroup = 0;
  bestsellers: Book[] = [];
  private booksSub: Subscription = new Subscription();
  @Output() bookSelected = new EventEmitter<Book>();
  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.booksSub = this.booksService.getCategoryBooks().subscribe((result) => {
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
    document.body.classList.add('modalOpen'); // add the CSS class to the body
  }

  ngOnDestroy(): void {
    this.booksSub.unsubscribe();
  }
}
