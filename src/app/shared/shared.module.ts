import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookCardComponent } from './book-card/book-card.component';
import { BooksCarouselComponent } from './books-carousel/books-carousel.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [NavbarComponent, BooksCarouselComponent, BookCardComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavbarComponent, BooksCarouselComponent, BookCardComponent],
})
export class SharedModule {}
