import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Book } from 'src/app/books/book.model';
import { BooksService } from 'src/app/books/books.service';

@Component({
  selector: 'app-progress-modal',
  templateUrl: './progress-modal.component.html',
  styleUrls: ['./progress-modal.component.css'],
})
export class ProgressModalComponent implements OnInit {
  @Input() book!: Book;
  @Output() close = new EventEmitter<void>();
  @Output() progressUpdate = new EventEmitter<number>();
  // private mode = 'view';
  // private bookId: string = '';

  constructor(
    private booksService: BooksService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onSubmit(pagesForm: NgForm) {
    if (pagesForm.invalid) {
      return;
    } else {
      let pagesRead = pagesForm.value.pages;
      const totalPages = this.book?.totalPages;
      if (totalPages !== undefined) {
        // calculate percentage
        this.booksService
          .updateBook({ id: this.book.id, pagesRead: pagesRead })
          .subscribe((res) => {
            pagesRead = res.book.pagesRead;
            const progress = (pagesRead / totalPages) * 100;
            console.log(progress);
            this.progressUpdate.emit(progress);
            this.close.emit();
          });
      }
    }
  }

  onCloseClick() {
    this.close.emit();
  }
}
