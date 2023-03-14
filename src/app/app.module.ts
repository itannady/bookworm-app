import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeroComponent } from './hero/hero.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { UserBooksComponent } from './books/user-books/user-books.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { BookModalComponent } from './books/book-modal/book-modal.component';
import { LibraryPageComponent } from './library-page/library-page.component';
import { NotesComponent } from './notes/notes.component';
import { AuthInterceptor } from './auth/auth-interceptor';

import { MatInputModule } from '@angular/material/input';
import { BestsellerListComponent } from './books/bestseller-list/bestseller-list.component';
import { DiscoverPageComponent } from './discover-page/discover-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    SignupComponent,
    LoginComponent,
    BookListComponent,
    UserBooksComponent,
    HomeComponent,
    BookModalComponent,
    LibraryPageComponent,
    NotesComponent,
    BestsellerListComponent,
    DiscoverPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatIconModule,
    MatInputModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
