import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CinemaContainerComponent } from './cinema-container.component';

describe('CinemaContainerComponent', () => {
  let component: CinemaContainerComponent;
  let fixture: ComponentFixture<CinemaContainerComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CinemaContainerComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CinemaContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
