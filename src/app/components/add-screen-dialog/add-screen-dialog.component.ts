import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppConstants } from 'src/app/constants';
import { NotificationService } from 'src/app/services/notification.service';
import { AppState, saveCinemaScreenStart } from 'src/app/state';

@Component({
  templateUrl: './add-screen-dialog.component.html'
})
export class AddScreenDialogComponent {

  maxNameLength: number = AppConstants.MAX_NAME_LENGTH;
  formGroup: FormGroup = new FormGroup({
    'name': new FormControl(null, [Validators.required, Validators.maxLength(this.maxNameLength)])
  });;
  
  constructor(
    public dialogRef: MatDialogRef<AddScreenDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cinemaId: number},
    private notificationService: NotificationService,
    private store$: Store<AppState>
    ){}

  public onSubmit(): void{
    if (this.formGroup.invalid) {
      if (this.formGroup.controls['name'].invalid) {
        this.notificationService.showError($localize`:@@error.missing_name:Type a name`);
      }
      return
    }

    const payload: any = {
      cinemaId: this.data.cinemaId,
      name: this.formGroup.controls['name'].value,
    };

    this.store$.dispatch(saveCinemaScreenStart(payload));

    this.onClose();

  }

  onClose(): void {
    this.dialogRef.close();
  }

}
