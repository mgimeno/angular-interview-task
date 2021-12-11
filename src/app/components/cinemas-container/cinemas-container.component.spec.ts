import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CinemasContainerComponent } from './cinemas-container.component';

describe('CinemasContainerComponent', () => {
  let component: CinemasContainerComponent;
  let fixture: ComponentFixture<CinemasContainerComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CinemasContainerComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CinemasContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
