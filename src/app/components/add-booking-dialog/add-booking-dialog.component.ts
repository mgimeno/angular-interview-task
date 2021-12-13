import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState, saveBookingStart } from 'src/app/state';

@Component({
  templateUrl: './add-booking-dialog.component.html'
})
export class AddBookingDialogComponent {
  
  constructor(
    public dialogRef: MatDialogRef<AddBookingDialogComponent>,
    private store$: Store<AppState>
    ){}

  public onSubmit(): void{

    this.store$.dispatch(saveBookingStart());

    this.onClose();

  }

  onClose(): void {
    this.dialogRef.close();
  }

}
