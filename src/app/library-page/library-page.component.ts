import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-library-page',
  templateUrl: './library-page.component.html',
  styleUrls: ['./library-page.component.css'],
})
export class LibraryPageComponent implements OnInit {
  selectedBook: any;

  constructor() {}

  ngOnInit(): void {}
}
