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

  ngOnInit(): void {
    document.body.classList.add('modalOpen');
  }

  onSubmit(pagesForm: NgForm) {
    if (pagesForm.invalid) {
      return;
    } else {
      let pagesRead = pagesForm.value.pages;
      const totalPages = this.book?.totalPages;
      if (totalPages !== undefined) {
        if (pagesRead >= totalPages) {
          console.log('all done');
        }
        this.booksService
          .updateBook({ id: this.book.id, pagesRead: pagesRead })
          .subscribe((res) => {
            pagesRead = res.book.pagesRead;
            // calculate percentage
            const progress = Math.min((pagesRead / totalPages) * 100, 100);
            if (progress >= 100) {
              this.book.status = 'Have Read';
            } else {
              this.book.status = 'Reading Now';
            }
            this.progressUpdate.emit(progress);
            document.body.classList.remove('modalOpen');
            this.close.emit();
          });
      }
    }
  }

  onCloseClick() {
    document.body.classList.remove('modalOpen');
    this.close.emit();
  }
}
