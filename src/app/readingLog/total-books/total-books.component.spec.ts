import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalBooksComponent } from './total-books.component';

describe('TotalBooksComponent', () => {
  let component: TotalBooksComponent;
  let fixture: ComponentFixture<TotalBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TotalBooksComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
