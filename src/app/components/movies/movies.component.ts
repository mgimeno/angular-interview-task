import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { IMovieContent, IMoviesState } from 'src/app/intefaces';
import { AddMovieDialogComponent } from '../add-movie-dialog/add-movie-dialog.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
})
export class MoviesComponent  implements OnChanges {
  
  @Input()
  public movies: IMoviesState | null = null;

  displayedColumns: string[] = ['id', 'name', 'runtime'];

  dataSource: MatTableDataSource<IMovieContent> = new MatTableDataSource([] as IMovieContent[]);
  showSearch = false;

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(private router: Router,private dialog: MatDialog) {}

  public ngOnChanges(): void{
    if(this.movies){
      this.dataSource.data = this.movies.elements;
      this.showSearch = this.movies.totalPages === 1;
    }
  }

  search(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.table.renderRows();
  }

  public onPageSelected(pageNumber: number): void{
    this.router.navigate(['/movies',pageNumber]);
  }

  public onAddElement(): void{
    this.dialog.open(AddMovieDialogComponent);
  }
}
