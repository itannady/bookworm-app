import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Book } from 'src/app/books/book.model';
import { BooksService } from 'src/app/books/books.service';

@Component({
  selector: 'app-progress-modal',
  templateUrl: './progress-modal.component.html',
  styleUrls: ['./progress-modal.component.css'],
})
export class ProgressModalComponent implements OnInit {
  userId: string | null = null;
  @Input() book!: Book;
  @Output() close = new EventEmitter<void>();
  @Output() progressUpdate = new EventEmitter<number>();
  @Output() updateStreak = new EventEmitter<boolean>();

  constructor(
    private booksService: BooksService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    document.body.classList.add('modalOpen');
  }

  onSubmit(pagesForm: NgForm) {
    if (pagesForm.invalid) {
      return;
    } else {
      let pagesRead = pagesForm.value.pages;
      const totalPages = this.book?.totalPages;
      if (totalPages !== undefined) {
        this.booksService
          .updateBook({
            userId: this.userId,
            id: this.book.id,
            pagesRead: pagesRead,
            lastUpdated: this.book.lastUpdated,
          })
          .subscribe((res) => {
            pagesRead = res.book.pagesRead;
            // calculate percentage
            const progress = Math.min((pagesRead / totalPages) * 100, 100);
            if (progress >= 100) {
              this.book.status = 'Have Read';
              this.booksService
                .updateBook({ id: this.book.id, status: this.book.status })
                .subscribe((res) => {
                  this.book.status = res.book.status;
                });
            } else {
              this.book.status = 'Reading Now';
              this.booksService
                .updateBook({ id: this.book.id, status: this.book.status })
                .subscribe((res) => {
                  this.book.status = res.book.status;
                });
            }
            this.progressUpdate.emit(progress);
            this.updateStreak.emit(true);
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
