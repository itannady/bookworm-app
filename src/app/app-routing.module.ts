import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { UserBooksComponent } from './books/user-books/user-books.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'list', component: UserBooksComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
