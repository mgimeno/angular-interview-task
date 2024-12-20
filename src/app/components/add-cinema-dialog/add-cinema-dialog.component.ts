import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppConstants } from 'src/app/constants';
import { NotificationService } from 'src/app/services/notification.service';
import { AppState, saveCinemaStart } from 'src/app/state';

@Component({
  templateUrl: './add-cinema-dialog.component.html'
})
export class AddCinemaDialogComponent {

  maxNameLength: number = AppConstants.MAX_NAME_LENGTH;
  formGroup: UntypedFormGroup = new UntypedFormGroup({
    'name': new UntypedFormControl(null, [Validators.required, Validators.maxLength(this.maxNameLength)])
  });;
  
  constructor(
    public dialogRef: MatDialogRef<AddCinemaDialogComponent>, 
    private notificationService: NotificationService,
    private store$: Store<AppState>
    ){}

  public onSubmit(): void{
    if (this.formGroup.invalid) {
      if (this.formGroup.controls['name'].invalid) {
        this.notificationService.showError($localize`:@@error.missing_name:Type a name`);
      }
      return;
    }

    const payload: any = {
      name: this.formGroup.controls['name'].value,
    };

    this.store$.dispatch(saveCinemaStart(payload));

    this.onClose();

  }

  onClose(): void {
    this.dialogRef.close();
  }

}
