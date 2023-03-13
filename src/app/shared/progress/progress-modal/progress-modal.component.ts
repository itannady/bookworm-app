import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-progress-modal',
  templateUrl: './progress-modal.component.html',
  styleUrls: ['./progress-modal.component.css'],
})
export class ProgressModalComponent implements OnInit {
  @Output() close = new EventEmitter<number>();
  pagesRead: number = 0;
  constructor() {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    console.log('hello');
    if (form.invalid) {
      return;
    }
    this.close.emit();
  }
}
