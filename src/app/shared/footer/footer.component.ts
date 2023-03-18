import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  currentPage: string = '';
  constructor(private router: Router) {
    this.router.events.subscribe((val) => {
      this.currentPage = this.router.url;
    });
  }

  ngOnInit(): void {}
}
