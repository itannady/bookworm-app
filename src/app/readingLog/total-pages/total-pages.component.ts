import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ReadingLogService } from '../readingLog.service';

@Component({
  selector: 'app-total-pages',
  templateUrl: './total-pages.component.html',
  styleUrls: ['./total-pages.component.css'],
})
export class TotalPagesComponent implements OnInit {
  isLoading = false;
  userId: string | null = null;
  totalPages: number = 0;
  monthName: string = '';
  constructor(
    private readingLogService: ReadingLogService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    const month = new Date().getMonth() + 1;
    this.monthName = new Date().toLocaleString('default', { month: 'long' });
    if (this.userId !== null) {
      this.readingLogService.getTotalPages(this.userId, month).subscribe({
        next: (result) => {
          this.totalPages = result.totalPagesRead;
          this.isLoading = false;
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
