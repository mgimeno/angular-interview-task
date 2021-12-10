import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType,Effect } from "@ngrx/effects";
import { catchError, EMPTY, map, Observable, switchMap } from "rxjs";
import { AppActions } from "../actions";
import { BookingsService, CinemasService, MoviesService } from "src/app/services";
import { IBookingsApiResponse, ICinemasApiResponse, IMoviesApiResponse } from "src/app/intefaces";
import { Action } from "@ngrx/store";

@Injectable()
export class AppEffects{

    constructor
    (
        private actions$: Actions,
        private cinemasService: CinemasService, 
        private moviesService: MoviesService,
        private bookingsService: BookingsService
    ){}

    @Effect()
    public getCinemasPage$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.fetchCinemasPageStart),
            switchMap(({pageNumber}) => 
             this.cinemasService.get(pageNumber)
                .pipe(
                    map((data: ICinemasApiResponse) =>  AppActions.fetchCinemasPageSuccess({data})),
                    catchError(error => { console.error(error); return EMPTY; }) 
             ))
        ));

        @Effect()
        public getMoviesPage$: Observable<Action> = createEffect(() =>
            this.actions$.pipe(
                ofType(AppActions.fetchMoviesPageStart),
                switchMap(({pageNumber}) =>
                    this.moviesService.get(pageNumber)
                    .pipe(
                        map((data: IMoviesApiResponse) => AppActions.fetchMoviesPageSuccess({data})),
                        catchError(error => { console.error(error); return EMPTY; }) 
                   ))
        ));

        @Effect()
        public getBookingsPage$: Observable<Action> = createEffect(() =>
            this.actions$.pipe(
                ofType(AppActions.fetchBookingsPageStart),
                switchMap(({pageNumber}) =>
                    this.bookingsService.get(pageNumber)
                    .pipe(
                        map((data: IBookingsApiResponse) => AppActions.fetchBookingsPageSuccess({data})),
                        catchError(error => { console.error(error); return EMPTY; }) 
                   ))
        ));
}

