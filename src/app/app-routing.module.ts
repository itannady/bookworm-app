import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { UserBooksComponent } from './books/user-books/user-books.component';
import { HomeComponent } from './home/home.component';
import { LibraryPageComponent } from './library-page/library-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'library',
    component: LibraryPageComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
