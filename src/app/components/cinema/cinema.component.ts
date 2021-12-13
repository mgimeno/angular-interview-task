import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IScreenContent } from 'src/app/intefaces';
import { ISelectedCinemaState } from 'src/app/intefaces/selected-cinema-state.interface';
import { CommonUtils } from 'src/app/utils';
import { AddBookingDialogComponent, AddScreenDialogComponent } from '..';
import { AddScreeningDialogComponent } from '../add-screening-dialog/add-screening-dialog.component';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html'
})
export class CinemaComponent {
  @Input()
  public cinema: ISelectedCinemaState | null = null;

  @Output()
  public screenSelected: EventEmitter< {cinemaId: number, screenId: number, screenName: string}> = new EventEmitter();
  @Output()
  public screeningSelected: EventEmitter< {cinemaId: number, screeningId: number}> = new EventEmitter();

  screensDisplayedColumns : string[] = ['id', 'name'];
  screeningsDisplayedColumns: string[] = ['id', 'start', 'movieName'];

  constructor(private dialog: MatDialog) {}

  public onAddScreen(): void{
    this.dialog.open(AddScreenDialogComponent, { data: { cinemaId: this.cinema?.id } });
  }

  public onAddScreening(): void{
    this.dialog.open(AddScreeningDialogComponent, { data: { cinemaId: this.cinema?.id, screenId: this.cinema?.selectedScreen?.id, screenName: this.cinema?.selectedScreen?.name } });
  }

  public onAddBooking(): void{
    this.dialog.open(AddBookingDialogComponent, { data: { screeningId: this.cinema?.selectedScreening?.id } });
  }

  public onScreenClicked(screen: IScreenContent): void{
    const payload: any = {
      cinemaId: this.cinema!.id,
      screenId: screen.id,
      screenName: screen.name
    };
    this.screenSelected.emit(payload);
    CommonUtils.scrollToBottom();
  }

  public onScreeningClicked(screeningId: number): void{
    const payload: any = {
      cinemaId: this.cinema!.id,
      screeningId
    };
    this.screeningSelected.emit(payload);
    CommonUtils.scrollToBottom();
  }
  
}

