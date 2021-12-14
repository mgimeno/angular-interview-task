import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ICinemaContent, ICinemasState } from 'src/app/intefaces';
import { AddCinemaDialogComponent } from '..';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
})
export class CinemasComponent implements OnChanges {
  @Input()
  public cinemas: ICinemasState | null = null;

  displayedColumns: string[] = ['id', 'name', 'screens'];
  
  dataSource: MatTableDataSource<ICinemaContent> = new MatTableDataSource([] as ICinemaContent[]);
  showSearch = false;

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(private router: Router,private dialog: MatDialog) {}

  public ngOnChanges(): void{
    if(this.cinemas){
      this.dataSource.data = this.cinemas.elements;
      this.showSearch = this.cinemas.totalPages === 1;
    }
  }

  search(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.table.renderRows();
  }

  public onPageSelected(pageNumber: number): void{
    this.router.navigate(['/cinemas',pageNumber]);
  }

  public onAddElement(): void{
    this.dialog.open(AddCinemaDialogComponent);
  }

  public onCinemaClicked(cinemaId: number): void{
    this.router.navigate(['/cinema',cinemaId]);
  }
}

