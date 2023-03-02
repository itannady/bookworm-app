import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { UserBooksComponent } from './user-books/user-books.component';

const routes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'list', component: UserBooksComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
