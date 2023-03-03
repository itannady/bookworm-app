import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BooksCarouselComponent } from './books-carousel/books-carousel.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [NavbarComponent, BooksCarouselComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavbarComponent],
})
export class SharedModule {}
