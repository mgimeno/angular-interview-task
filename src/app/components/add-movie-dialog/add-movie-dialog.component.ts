import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppConstants } from 'src/app/constants';
import { NotificationService } from 'src/app/services/notification.service';
import { AppState, saveMovieStart } from 'src/app/state';

@Component({
  templateUrl: './add-movie-dialog.component.html'
})
export class AddMovieDialogComponent {

  maxNameLength: number = AppConstants.MAX_NAME_LENGTH;
  formGroup: UntypedFormGroup = new UntypedFormGroup({
    'name': new UntypedFormControl(null, [Validators.required, Validators.maxLength(this.maxNameLength)]),
    'runtime': new UntypedFormControl(null, [Validators.required, Validators.min(1),Validators.max(3600),  ]),
  });;
  
  constructor(
    public dialogRef: MatDialogRef<AddMovieDialogComponent>, 
    private notificationService: NotificationService,
    private store$: Store<AppState>
    ){}

  public onSubmit(): void{
    if (this.formGroup.invalid) {
      if (this.formGroup.controls['name'].invalid) {
        this.notificationService.showError($localize`:@@error.missing_name:Type a name`);
      }
      else if (this.formGroup.controls['runtime'].invalid) {
        this.notificationService.showError($localize`:@@error.missing_runtime:Type the runtime`);
      }
      return;
    }

    const payload: any = {
      name: this.formGroup.controls['name'].value,
      runtime: this.formGroup.controls['runtime'].value
    };

    this.store$.dispatch(saveMovieStart(payload));

    this.onClose();

  }

  onClose(): void {
    this.dialogRef.close();
  }

}
