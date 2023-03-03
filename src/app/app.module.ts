import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeroComponent } from './hero/hero.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { UserBooksComponent } from './books/user-books/user-books.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    SignupComponent,
    LoginComponent,
    BookListComponent,
    UserBooksComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
