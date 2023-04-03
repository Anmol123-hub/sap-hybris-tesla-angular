import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogindealerComponent } from './logindealer.component';

describe('LogindealerComponent', () => {
  let component: LogindealerComponent;
  let fixture: ComponentFixture<LogindealerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogindealerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogindealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
