import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, map, Observable, switchMap } from "rxjs";
import { AppActions } from "../actions";
import { BookingsService, CinemasService, MoviesService } from "src/app/services";
import { IBookingsApiResponse, ICinemasApiResponse, IMoviesApiResponse } from "src/app/intefaces";
import { Router } from "@angular/router";
import { NotificationService } from "src/app/services/notification.service";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class AppEffects{

    constructor
    (
        private actions$: Actions,
        private cinemasService: CinemasService, 
        private moviesService: MoviesService,
        private bookingsService: BookingsService,
        private router: Router,
        private notificationService: NotificationService
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
                    catchError((error: HttpErrorResponse) => { this.notificationService.showError(error.message); return EMPTY; }) 
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
                    catchError((error: HttpErrorResponse) => { this.notificationService.showError(error.message); return EMPTY; }) 
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
                    catchError((error: HttpErrorResponse) => { this.notificationService.showError(error.message); return EMPTY; }) 
             ))
        ));

        public saveMovie$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.saveMovieStart),
            switchMap(({name, runtime}) => 
             this.moviesService.save({name, runtime})
                .pipe(
                    map(() => {
                        this.notificationService.showSuccess("Movie saved successfully");
                        this.router.navigate(['/movies']);
                        return AppActions.fetchMoviesStart({isGetAll: false, pageNumber: 0});
                    }),
                    catchError((error: HttpErrorResponse) => { this.notificationService.showError(error.message); return EMPTY; }) 
             ))
        ));

        public saveCinema$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.saveCinemaStart),
            switchMap(({name}) => 
             this.cinemasService.save({name})
                .pipe(
                    map(() => {
                        this.notificationService.showSuccess("Cinema saved successfully");
                        this.router.navigate(['/cinemas']);
                        return AppActions.fetchCinemasStart({isGetAll: false, isGetAlsoScreens: false, pageNumber: 0});
                    }),
                    catchError((error: HttpErrorResponse) => { this.notificationService.showError(error.message); return EMPTY; }) 
             ))
        ));

        public saveBooking$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.saveBookingStart),
            switchMap(() => 
             this.bookingsService.save()
                .pipe(
                    map(() => {
                        this.notificationService.showSuccess("Booking saved successfully");
                        this.router.navigate(['/bookings']);
                        return AppActions.fetchBookingsStart({isGetAll: false, pageNumber: 0});
                    }),
                    catchError((error: HttpErrorResponse) => { this.notificationService.showError(error.message); return EMPTY; }) 
             ))
        ));

        

}

