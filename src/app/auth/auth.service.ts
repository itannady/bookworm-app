import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private token: string | null = null;
  private authStatusListener = new Subject<boolean>();

  API_URL = 'http://localhost:5040';

  constructor(private http: HttpClient) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post(`${this.API_URL}/user/signup`, authData)
      .subscribe((response) => {
        console.log(response);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{ token: string }>(`${this.API_URL}/user/login`, authData)
      .subscribe((response) => {
        const token = response.token;
        this.token = token;
        if (token) {
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
        }
      });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
  }
}
