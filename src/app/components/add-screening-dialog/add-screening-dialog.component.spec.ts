import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddScreeningDialogComponent } from './add-screening-dialog.component';

describe('AddScreeningDialogComponent', () => {
  let component: AddScreeningDialogComponent;
  let fixture: ComponentFixture<AddScreeningDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddScreeningDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScreeningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
