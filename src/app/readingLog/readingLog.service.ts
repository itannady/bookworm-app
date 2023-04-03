import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ReadingLog } from './readingLog.model';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';

import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;

@Injectable({ providedIn: 'root' })
export class ReadingLogService {
  constructor(private http: HttpClient, private router: Router) {}

  getStreak(userId: string) {
    return this.http.get<{ message: string; streak: number }>(
      `${API_URL}/log/streak/${userId}`
    );
  }

  getTotalPages(userId: string, month: number) {
    return this.http.get<{ message: string; totalPagesRead: number }>(
      `${API_URL}/log/total-pages/${userId}/${month}`
    );
  }
}
