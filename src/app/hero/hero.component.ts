import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Book } from '../books/book.model';
import { BooksService } from '../books/books.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit, OnDestroy {
  name: string | null = null;
  form: FormGroup;
  @Output() query = new EventEmitter<string>();
  showSearchResults = false;
  userIsAuthenticated = false;
  private authStatusSub: Subscription = new Subscription();

  constructor(
    private booksService: BooksService,
    private authService: AuthService
  ) {
    this.form = new FormGroup({
      searchbar: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.name = this.authService.getName();
    console.log('hero', this.name);
  }

  onSearch() {
    const query = this.form.get('searchbar')?.value;
    this.booksService.populateBooks(query);
    this.query.emit(query);
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }
}
