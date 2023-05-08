import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ReadingLogService } from '../readingLog.service';

@Component({
  selector: 'app-total-books',
  templateUrl: './total-books.component.html',
  styleUrls: ['./total-books.component.css'],
})
export class TotalBooksComponent implements OnInit {
  isLoading = false;
  userId: string | null = null;
  totalBooks: number = 0;
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
      this.readingLogService.getTotalBooks(this.userId, month).subscribe({
        next: (result) => {
          this.totalBooks = result.totalBooksRead;
          this.isLoading = false;
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
