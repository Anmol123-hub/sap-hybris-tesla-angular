import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptdashboardComponent } from './acceptdashboard.component';

describe('AcceptdashboardComponent', () => {
  let component: AcceptdashboardComponent;
  let fixture: ComponentFixture<AcceptdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptdashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
