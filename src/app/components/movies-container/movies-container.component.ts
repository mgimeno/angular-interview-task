import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IMoviesState } from 'src/app/intefaces';
import { AppActions, AppState, getMovies } from 'src/app/state';

@Component({
  templateUrl: './movies-container.component.html'
})
export class MoviesContainerComponent implements OnInit, OnDestroy {

  public movies$: Observable<IMoviesState> | undefined;

  public subscriptions = new Subscription();

  constructor(private store$: Store<AppState>, private route: ActivatedRoute) {
  }

  public ngOnInit(): void{

    this.movies$ = this.store$.pipe(select(getMovies));

    this.subscriptions.add(this.route.paramMap
      .subscribe((params) => {
        const pageNumber = params.get('id') ? Number(params.get('id')) - 1 : 0;
        this.store$.dispatch(AppActions.fetchMoviesStart({isGetAll: false, pageNumber}));
      }));

  } 

  public ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }
}
