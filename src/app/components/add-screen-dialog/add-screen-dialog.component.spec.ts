import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddScreenDialogComponent } from './add-screen-dialog.component';

describe('AddScreenDialogComponent', () => {
  let component: AddScreenDialogComponent;
  let fixture: ComponentFixture<AddScreenDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddScreenDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScreenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
