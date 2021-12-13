import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ICinemasState } from 'src/app/intefaces';
import { AppActions, AppState, getCinemas } from 'src/app/state';

@Component({
  templateUrl: './cinemas-container.component.html'
})
export class CinemasContainerComponent implements OnInit, OnDestroy {

  public cinemas$: Observable<ICinemasState> | undefined;

  public subscriptions = new Subscription();

  constructor(private store$: Store<AppState>, private route: ActivatedRoute) {
  }

  public ngOnInit(): void{

    this.cinemas$ = this.store$.pipe(select(getCinemas));

    this.subscriptions.add(this.route.paramMap
      .subscribe((params) => {
        const pageNumber = params.get('id') ? Number(params.get('id')) - 1 : 0;
        this.store$.dispatch(AppActions.fetchCinemasStart({isGetAll: false, isGetAlsoScreens: false, pageNumber}));
      }));

  } 

  public ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }

}
