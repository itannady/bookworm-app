import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-progress-modal',
  templateUrl: './progress-modal.component.html',
  styleUrls: ['./progress-modal.component.css'],
})
export class ProgressModalComponent implements OnInit {
  @Input() totalPages?: number;
  @Input() pagesRead?: number;
  @Output() close = new EventEmitter<void>();
  @Output() progressUpdate = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}

  onSubmit(pagesForm: NgForm) {
    if (pagesForm.invalid) {
      return;
    } else {
      const pagesRead = pagesForm.value.pages;
      const totalPages = this.totalPages;
      if (totalPages !== undefined) {
        // calculate percentage
        const progress = (pagesRead / totalPages) * 100;
        this.progressUpdate.emit(progress);
        this.close.emit();
      }
    }
  }

  onCloseClick() {
    this.close.emit();
  }
}
