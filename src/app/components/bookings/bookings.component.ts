import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IBookingsState } from 'src/app/intefaces';
import { AddBookingDialogComponent } from '..';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
})
export class BookingsComponent {
  
  @Input()
  public bookings: IBookingsState | null = null;

  displayedColumns: string[] = ['id'];

  constructor(private router: Router,private dialog: MatDialog) {}

  public onPageSelected(pageNumber: number): void{
    this.router.navigate(['/bookings',pageNumber]);
  }

  public onAddElement(): void{
    this.dialog.open(AddBookingDialogComponent);
  }
}
