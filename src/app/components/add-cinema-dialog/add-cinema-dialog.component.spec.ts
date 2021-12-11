import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddCinemaDialogComponent } from './add-cinema-dialog.component';

describe('AddCinemaDialogComponent', () => {
  let component: AddCinemaDialogComponent;
  let fixture: ComponentFixture<AddCinemaDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCinemaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCinemaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
