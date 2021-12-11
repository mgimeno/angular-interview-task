import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MoviesContainerComponent } from './movies-container.component';

describe('MoviesContainerComponent', () => {
  let component: MoviesContainerComponent;
  let fixture: ComponentFixture<MoviesContainerComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MoviesContainerComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
