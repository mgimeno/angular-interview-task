import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './add-movie-dialog.component.html',
  styleUrls: ['./add-movie-dialog.component.scss']
})
export class AddMovieDialogComponent {

  constructor(public dialogRef: MatDialogRef<AddMovieDialogComponent>){}

  public onSave(): void{
;
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
