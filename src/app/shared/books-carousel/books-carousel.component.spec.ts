import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksCarouselComponent } from './books-carousel.component';

describe('BooksCarouselComponent', () => {
  let component: BooksCarouselComponent;
  let fixture: ComponentFixture<BooksCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
