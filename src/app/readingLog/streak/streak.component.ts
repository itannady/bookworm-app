import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ReadingLogService } from '../readingLog.service';

@Component({
  selector: 'app-streak',
  templateUrl: './streak.component.html',
  styleUrls: ['./streak.component.css'],
})
export class StreakComponent implements OnInit {
  userId: string | null = null;
  streak: number = 1;
  constructor(
    private readingLogService: ReadingLogService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    if (this.userId !== null) {
      this.readingLogService.getStreak(this.userId).subscribe(
        (result) => {
          this.streak = result.streak;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
