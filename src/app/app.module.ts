import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LibraryPageComponent } from './library-page/library-page.component';
import { HeroComponent } from './hero/hero.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { UserBooksComponent } from './books/user-books/user-books.component';
import { BestsellerListComponent } from './books/bestseller-list/bestseller-list.component';
import { CategoryListComponent } from './books/category-list/category-list.component';
import { BookModalComponent } from './books/book-modal/book-modal.component';
import { NotesComponent } from './notes/notes.component';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AngularMaterialModule } from './angular-material.module';

import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { StreakComponent } from './readingLog/streak/streak.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    BookListComponent,
    UserBooksComponent,
    HomeComponent,
    BookModalComponent,
    LibraryPageComponent,
    NotesComponent,
    BestsellerListComponent,
    CategoryListComponent,
    StreakComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    NoopAnimationsModule,
    AngularMaterialModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
