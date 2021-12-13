import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { NotificationService } from 'src/app/services';
import { AppState, saveBookingStart } from 'src/app/state';

@Component({
  templateUrl: './add-booking-dialog.component.html'
})
export class AddBookingDialogComponent {

  formGroup: FormGroup = new FormGroup({
    'seat': new FormControl(null, [Validators.required, Validators.min(1)])
  });;
  
  constructor(
    public dialogRef: MatDialogRef<AddBookingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { screeningId: number},
    private store$: Store<AppState>,
    private notificationService: NotificationService
    ){}

  public onSubmit(): void{

    if (this.formGroup.invalid) {
      if (this.formGroup.controls['seat'].invalid) {
        this.notificationService.showError($localize`:@@error.missing_name:Type how many seats`);
      }
      return;
    }

    const payload: any = {
      screeningId: this.data.screeningId,
      seat: this.formGroup.controls['seat'].value,
    };

    this.store$.dispatch(saveBookingStart(payload));

    this.onClose();

  }

  onClose(): void {
    this.dialogRef.close();
  }

}
