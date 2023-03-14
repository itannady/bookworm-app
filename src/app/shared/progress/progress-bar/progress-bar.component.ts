import { Component, OnInit, Input, Output } from '@angular/core';
import { Book } from 'src/app/books/book.model';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
})
export class ProgressBarComponent implements OnInit {
  @Input() totalPages?: number;
  @Input() pagesRead?: number;
  isModalOpen = false;
  showProgressModal = false;
  progress: number = 0;

  constructor() {}

  ngOnInit(): void {}

  updateProgress(progress: number) {
    this.progress = progress;
    console.log(this.progress);
  }

  showModal() {
    this.showProgressModal = true;
  }
}
