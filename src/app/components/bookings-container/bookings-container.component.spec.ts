import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BookingsContainerComponent } from './bookings-container.component';

describe('BookingsContainerComponent', () => {
  let component: BookingsContainerComponent;
  let fixture: ComponentFixture<BookingsContainerComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BookingsContainerComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
