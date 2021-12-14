import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { IBookingContent, IBookingsState } from 'src/app/intefaces';
import { AddBookingDialogComponent } from '..';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
})
export class BookingsComponent  implements OnChanges {
  
  @Input()
  public bookings: IBookingsState | null = null;

  displayedColumns: string[] = ['id'];

  dataSource: MatTableDataSource<IBookingContent> = new MatTableDataSource([] as IBookingContent[]);
  showSearch = false;

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(private router: Router) {}

  public ngOnChanges(): void{
    if(this.bookings){
      this.dataSource.data = this.bookings.elements;
      this.showSearch = this.bookings.totalPages === 1;
    }
  }

  search(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.table.renderRows();
  }

  public onPageSelected(pageNumber: number): void{
    this.router.navigate(['/bookings',pageNumber]);
  }

}
