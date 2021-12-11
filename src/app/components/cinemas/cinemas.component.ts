import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {  Router } from '@angular/router';
import { ICinemasState } from 'src/app/intefaces';
import { AddCinemaDialogComponent } from '..';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.scss'],
})
export class CinemasComponent {
  @Input()
  public cinemas: ICinemasState | null = null;

  displayedColumns: string[] = ['id', 'name', 'screens'];

  constructor(private router: Router,private dialog: MatDialog) {}

  public onPageSelected(pageNumber: number): void{
    this.router.navigate(['/cinemas',pageNumber]);
  }

  public onAddElement(): void{
    this.dialog.open(AddCinemaDialogComponent);
  }
}

