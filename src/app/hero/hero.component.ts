import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Book } from '../books/book.model';
import { BooksService } from '../books/books.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit {
  form: FormGroup;

  constructor(private booksService: BooksService) {
    this.form = new FormGroup({
      searchbar: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  onSearch() {
    const query = this.form.get('searchbar')?.value;
    this.booksService.populateBooks(query);

    console.log(this.form.get('searchbar')?.value);
  }
}
