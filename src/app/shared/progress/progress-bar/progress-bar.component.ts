import { Component, OnInit, Input, Output } from '@angular/core';
import { Book } from 'src/app/books/book.model';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
})
export class ProgressBarComponent implements OnInit {
  isModalOpen = false;
  progress = 50;
  showProgressModal = false;

  constructor() {}

  ngOnInit(): void {}

  showModal() {
    console.log('hello');
    this.showProgressModal = true;
  }
}
