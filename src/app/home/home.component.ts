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
import { BooksService } from '../books/books.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  selectedBook: any;
  form: FormGroup;
  showSearchResults = false;
  userIsAuthenticated = false;
  @Output() searchQuery = new EventEmitter<string>();
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
  }

  onSearch() {
    const query = this.form.get('searchbar')?.value;
    this.booksService.populateBooks(query);
    this.showSearchResults = true;
    console.log(this.form.get('searchbar')?.value);
    this.searchQuery.emit(query);
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }
}
