import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IBookingsState, IMoviesState } from 'src/app/intefaces';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
})
export class BookingsComponent {
  
  @Input()
  public bookings: IBookingsState | null = null;

  displayedColumns: string[] = ['id'];

  constructor(private router: Router) {}

  public onPageSelected(pageNumber: number): void{
    this.router.navigate(['/bookings',pageNumber]);
  }

  public onAddElement(): void{
    ;
  }
}
