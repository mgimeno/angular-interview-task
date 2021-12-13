import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ISelectedCinemaState } from 'src/app/intefaces/selected-cinema-state.interface';
import { AppActions, AppState, getSelectedCinema } from 'src/app/state';

@Component({
  templateUrl: './cinema-container.component.html'
})
export class CinemaContainerComponent implements OnInit, OnDestroy {

  public cinema$: Observable<ISelectedCinemaState> | undefined;

  public subscriptions = new Subscription();

  constructor(private store$: Store<AppState>, private route: ActivatedRoute) {
  }

  public ngOnInit(): void{

    this.cinema$ = this.store$.pipe(select(getSelectedCinema));

    this.subscriptions.add(this.route.paramMap
      .subscribe((params) => {
        const cinemaId = Number(params.get('id'));
        this.store$.dispatch(AppActions.fetchCinemaStart({id: cinemaId}));
      }));

  } 

  public onScreenSelected(payload: {cinemaId: number, screenId: number, screenName: string}): void{
    this.store$.dispatch(AppActions.selectScreenStart(payload));
  }

  public onScreeningSelected(payload: {cinemaId: number, screeningId: number}): void{
    this.store$.dispatch(AppActions.selectScreeningStart(payload));
  }

  public ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }

}
