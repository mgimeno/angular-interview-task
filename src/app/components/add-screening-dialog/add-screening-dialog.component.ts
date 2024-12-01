import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IMovieContent } from 'src/app/intefaces';
import { NotificationService } from 'src/app/services/notification.service';
import { AppActions, AppState, getMovies, saveCinemaScreenScreeningStart } from 'src/app/state';

@Component({
  templateUrl: './add-screening-dialog.component.html'
})
export class AddScreeningDialogComponent implements OnInit {

  public movies: IMovieContent[] = [];

  public formGroup: UntypedFormGroup = new UntypedFormGroup({
    'movieId': new UntypedFormControl(null, [Validators.required, Validators.min(1)]),
    'startTime': new UntypedFormControl(null, [Validators.required])
  });;

  public subscriptions = new Subscription();
  
  constructor(
    public dialogRef: MatDialogRef<AddScreeningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cinemaId: number,screenId: number, screenName: string},
    private notificationService: NotificationService,
    private store$: Store<AppState>
    ){}

  public ngOnInit(): void{
    this.subscriptions.add(this.store$.pipe(select(getMovies)).subscribe((movies) => {
      this.movies = movies.elements;
    }));
    this.store$.dispatch(AppActions.fetchMoviesStart({isGetAll: true, pageNumber: 0}));
  }

  public onSubmit(): void{
    if (this.formGroup.invalid) {
      if (this.formGroup.controls['movieId'].invalid) {
        this.notificationService.showError($localize`:@@error.missing_name:Select a movie`);
      }
      if (this.formGroup.controls['startTime'].invalid) {
        this.notificationService.showError($localize`:@@error.missing_name:Type a start time`);
      }
      return
    }

    const payload: any = {
      cinemaId: this.data.cinemaId,
      screenId: this.data.screenId,
      screenName: this.data.screenName,
      movieId: this.formGroup.controls['movieId'].value,
      startTime: this.formGroup.controls['startTime'].value,
    };

    this.store$.dispatch(saveCinemaScreenScreeningStart(payload));

    this.onClose(true);

  }

  onClose(hasSaved: boolean = false): void {
    this.dialogRef.close({hasSaved});
  }

  ngOnDestroy(): void{
    this.subscriptions.unsubscribe();
  }

}
