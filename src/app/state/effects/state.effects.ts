import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, Observable, switchMap } from "rxjs";
import { AppActions } from "../actions";
import { BookingsService, CinemasService, MoviesService } from "src/app/services";
import { IBookingsApiResponse, ICinemasApiResponse, IMoviesApiResponse } from "src/app/intefaces";

@Injectable()
export class AppEffects{

    constructor
    (
        private actions$: Actions,
        private cinemasService: CinemasService, 
        private moviesService: MoviesService,
        private bookingsService: BookingsService
    ){}


    public getDashboardInfo$: Observable<any> = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.fetchDashboardInfo),
            switchMap(() => 
             [
                AppActions.fetchCinemasStart({isGetAll: true, isGetAlsoScreens: true, pageNumber: 0 }),
                AppActions.fetchMoviesStart({isGetAll: false, pageNumber: 0}),
                AppActions.fetchBookingsStart({isGetAll: false, pageNumber: 0})
             ]
    )));

        public getCinemas$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.fetchCinemasStart),
            switchMap(({isGetAll,isGetAlsoScreens,pageNumber}) => 
             this.cinemasService.get(pageNumber)
                .pipe(
                    switchMap((data: ICinemasApiResponse) => {
                        const actions: any[] = [AppActions.fetchCinemasSuccess({isGetAll, isGetAlsoScreens,data})];
                        if(isGetAll && pageNumber < data.totalPages -1){
                            actions.push(AppActions.fetchCinemasStart({isGetAll, isGetAlsoScreens, pageNumber: (pageNumber + 1)}));
                        }
                        return actions; 
                    }),
                    catchError(error => { console.error(error); return EMPTY; }) 
             ))
        ));

        public getMovies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.fetchMoviesStart),
            switchMap(({isGetAll,pageNumber}) => 
             this.moviesService.get(pageNumber)
                .pipe(
                    switchMap((data: IMoviesApiResponse) => {
                        const actions: any[] = [AppActions.fetchMoviesSuccess({isGetAll,data})];
                        if(isGetAll && pageNumber < data.totalPages -1){
                            actions.push(AppActions.fetchMoviesStart({isGetAll, pageNumber: (pageNumber + 1)}));
                        }
                        return actions; 
                    }),
                    catchError(error => { console.error(error); return EMPTY; }) 
             ))
        ));

        public getBookings$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.fetchBookingsStart),
            switchMap(({isGetAll,pageNumber}) => 
             this.bookingsService.get(pageNumber)
                .pipe(
                    switchMap((data: IBookingsApiResponse) => {
                        const actions: any[] = [AppActions.fetchBookingsSuccess({isGetAll,data})];
                        if(isGetAll && pageNumber < data.totalPages -1){
                            actions.push(AppActions.fetchBookingsStart({isGetAll, pageNumber: (pageNumber + 1)}));
                        }
                        return actions; 
                    }),
                    catchError(error => { console.error(error); return EMPTY; }) 
             ))
        ));

}

