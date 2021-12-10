import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, fetchBookingsPageStart, fetchCinemasPageStart, fetchMoviesPageStart, getCinemasCount, getMoviesCount,getBookingsCount } from 'src/app/state';

@Component({
  templateUrl: './dashboard-container.component.html'
})
export class DashboardContainerComponent implements OnInit {

  public cinemasCount$: Observable<number> | undefined;
  public moviesCount$: Observable<number> | undefined;
  public bookingsCount$: Observable<number> | undefined;

  constructor(private store$: Store<AppState>) {
  }

  public ngOnInit(): void{
    this.store$.dispatch(fetchCinemasPageStart({}));
    this.store$.dispatch(fetchMoviesPageStart({}));
    this.store$.dispatch(fetchBookingsPageStart({}));

    this.cinemasCount$ = this.store$.pipe(select(getCinemasCount));
    this.moviesCount$ = this.store$.pipe(select(getMoviesCount));
    this.bookingsCount$ = this.store$.pipe(select(getBookingsCount));

  }

}
