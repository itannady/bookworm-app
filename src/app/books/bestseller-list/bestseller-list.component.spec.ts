import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BestsellerListComponent } from './bestseller-list.component';

describe('BestsellerListComponent', () => {
  let component: BestsellerListComponent;
  let fixture: ComponentFixture<BestsellerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BestsellerListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BestsellerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
