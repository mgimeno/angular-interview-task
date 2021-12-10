import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TaskRequirementsComponent } from './task-requirements.component';

describe('TaskRequirementsComponent', () => {
  let component: TaskRequirementsComponent;
  let fixture: ComponentFixture<TaskRequirementsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TaskRequirementsComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
