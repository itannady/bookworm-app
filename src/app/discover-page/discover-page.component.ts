import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Book } from '../books/book.model';
import { BooksService } from '../books/books.service';
@Component({
  selector: 'app-discover-page',
  templateUrl: './discover-page.component.html',
  styleUrls: ['./discover-page.component.css'],
})
export class DiscoverPageComponent implements OnInit {
  selectedBook: any;
  form: FormGroup;
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
  }

  onSearch() {
    const query = this.form.get('searchbar')?.value;
    this.booksService.populateBooks(query);

    console.log(this.form.get('searchbar')?.value);
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }
}
