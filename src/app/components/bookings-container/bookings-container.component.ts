import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IBookingsState } from 'src/app/intefaces';
import { AppActions, AppState, getBookings } from 'src/app/state';

@Component({
  templateUrl: './bookings-container.component.html'
})
export class BookingsContainerComponent implements OnInit, OnDestroy {

  public bookings$: Observable<IBookingsState> | undefined;

  public subscriptions = new Subscription();

  constructor(private store$: Store<AppState>, private route: ActivatedRoute) {
  }

  public ngOnInit(): void{

    this.bookings$ = this.store$.pipe(select(getBookings));

    this.subscriptions.add(this.route.paramMap
      .subscribe((params) => {
        const pageNumber = params.get('id') ? Number(params.get('id')) - 1 : 0;
        this.store$.dispatch(AppActions.fetchBookingsStart({isGetAll: false, pageNumber}));
      }));

  } 

  public ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }

}
