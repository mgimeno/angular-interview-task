import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IMoviesState } from 'src/app/intefaces';
import { AddMovieDialogComponent } from '../add-movie-dialog/add-movie-dialog.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent {
  
  @Input()
  public movies: IMoviesState | null = null;

  displayedColumns: string[] = ['id', 'name', 'runtime'];

  constructor(private router: Router,private dialog: MatDialog) {}

  public onPageSelected(pageNumber: number): void{
    this.router.navigate(['/movies',pageNumber]);
  }

  public onAddElement(): void{
    this.dialog.open(AddMovieDialogComponent);
  }
}
