import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPagesComponent } from './total-pages.component';

describe('TotalPagesComponent', () => {
  let component: TotalPagesComponent;
  let fixture: ComponentFixture<TotalPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalPagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
