import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ReadingLog } from './readingLog.model';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReadingLogService {
  API_URL = 'http://localhost:5040';
  constructor(private http: HttpClient, private router: Router) {}
}

// get streak
// getStreak() {
//   return this.http.get(`${this.API_URL}/log/streak`);
// }
