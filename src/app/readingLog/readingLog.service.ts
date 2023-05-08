import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;

@Injectable({ providedIn: 'root' })
export class ReadingLogService {
  constructor(private http: HttpClient, private router: Router) {}

  getStreak(userId: string): Observable<any> {
    return this.http.get<{ message: string; streak: number }>(
      `${API_URL}/log/streak/${userId}`
    );
  }

  getTotalBooks(userId: string, month: number): Observable<any> {
    return this.http.get<{ message: string; totalBooksRead: number }>(
      `${API_URL}/log/total-books/${userId}/${month}`
    );
  }
}
