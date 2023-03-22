import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Book } from '../books/book.model';
import { BooksService } from '../books/books.service';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  notesForm!: FormGroup;
  editing: boolean = false;
  @Input() book!: Book;
  @Output() close = new EventEmitter<void>();
  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.notesForm = new FormGroup({
      notes: new FormControl(this.book.notes, {
        validators: [Validators.required],
      }),
    });
  }

  onSavePost() {
    if (this.notesForm.invalid) {
      return;
    } else {
      let notes = this.notesForm.value.notes;
      this.booksService
        .updateBook({ id: this.book.id, notes: notes })
        .subscribe((res) => {
          this.book.notes = res.book.notes;
          this.editing = false;
          this.close.emit();
        });
    }
  }

  onEdit() {
    this.editing = true;
  }

  onCloseClick() {
    document.body.classList.remove('modalOpen');
    this.close.emit();
  }
}
