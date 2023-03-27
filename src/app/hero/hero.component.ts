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
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit, OnDestroy {
  name: string | null = null;
  greeting: string = 'Welcome back';
  form: FormGroup;
  showSearchResults = false;
  userIsAuthenticated = false;
  @Output() query = new EventEmitter<string>();
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
    // Update the message based on the current time
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      this.greeting = 'Good morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      this.greeting = 'Good afternoon';
    } else if (currentHour >= 18 && currentHour < 22) {
      this.greeting = 'Good evening';
    } else {
      this.greeting = 'Welcome back';
    }
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
