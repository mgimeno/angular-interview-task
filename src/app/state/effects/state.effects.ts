import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, map, Observable, switchMap, tap, withLatestFrom } from "rxjs";
import { AppActions } from "../actions";
import { BookingsService, CinemasService, MoviesService } from "src/app/services";
import { IBookingsApiResponse, ICinemasApiResponse, IMoviesApiResponse, IScreeningsApiResponse, IScreensApiResponse } from "src/app/intefaces";
import { Router } from "@angular/router";
import { NotificationService } from "src/app/services/notification.service";
import { HttpErrorResponse } from "@angular/common/http";
import { AppState, getCinemasPageNumber, getMoviesPageNumber } from "..";
import { Store } from "@ngrx/store";

@Injectable()
export class AppEffects{

    constructor
    (
        private actions$: Actions,
        private store$: Store<AppState>,
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
            withLatestFrom(this.store$.select(getMoviesPageNumber)),
            switchMap(([payload, currentPageNumber]) => 
             this.moviesService.save(payload)
                .pipe(
                    map(() => {
                        this.notificationService.showSuccess("Movie saved successfully");
                        this.router.navigate(['/movies', (currentPageNumber + 1)]);
                        return AppActions.fetchMoviesStart({isGetAll: false, pageNumber: currentPageNumber});
                    }),
                    catchError((error: HttpErrorResponse) => { this.notificationService.showError(error.message); return EMPTY; }) 
             ))
        ));

        public saveCinema$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.saveCinemaStart),
            withLatestFrom(this.store$.select(getCinemasPageNumber)),
            switchMap(([payload, currentPageNumber]) => 
             this.cinemasService.save(payload)
                .pipe(
                    map(() => {
                        this.notificationService.showSuccess("Cinema saved successfully");
                        this.router.navigate(['/cinemas', (currentPageNumber + 1)]);
                        return AppActions.fetchCinemasStart({isGetAll: false, isGetAlsoScreens: false, pageNumber: currentPageNumber});
                    }),
                    catchError((error: HttpErrorResponse) => { this.notificationService.showError(error.message); return EMPTY; }) 
             ))
        ));

        public saveBooking$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.saveBookingStart),
            switchMap(({screeningId, seat}) => 
             this.bookingsService.save({screeningId, seat})
                .pipe(
                    tap(() => {
                        this.notificationService.showSuccess("Booking saved successfully");
                    }),
                    catchError((error: HttpErrorResponse) => { this.notificationService.showError(error.message); return EMPTY; }) 
             ))
        ),
        { dispatch: false }
        );

        public getCinema$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.fetchCinemaStart),
            switchMap(({id}) => 
             this.cinemasService.getAll()
                .pipe(
                    switchMap((data: ICinemasApiResponse) => {
                        const cinema = data.content.find(cinema=> cinema.id === id);
                        if(cinema){
                            return [
                                AppActions.fetchCinemaSuccess({data: cinema}),
                                AppActions.fetchCinemaScreensStart({cinemaId: id})
                            ];
                        }
                        else{
                            this.notificationService.showError("Cinema not found"); return EMPTY;
                        }
                    }),
                    catchError((error: HttpErrorResponse) => { this.notificationService.showError(error.message); return EMPTY; }) 
             ))
        ));

        public getCinemaScreens$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.fetchCinemaScreensStart),
            switchMap(({cinemaId}) => 
             this.cinemasService.getAllScreensForCinema(cinemaId)
                .pipe(
                    map((data: IScreensApiResponse) => 
                        AppActions.fetchCinemaScreensSuccess({data: data.content})
                    ),
                    catchError((error: HttpErrorResponse) => { this.notificationService.showError(error.message); return EMPTY; }) 
             ))
        ));

        public selectScreenStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.selectScreenStart),
            map(({cinemaId, screenId, screenName}) => 
             AppActions.fetchCinemaScreenScreeningsStart({cinemaId, screenName})
             )
        ));

        public getAllScreeningsForCinema$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.fetchCinemaScreenScreeningsStart),
            switchMap(({cinemaId, screenName}) => 
             this.cinemasService.getAllScreeningsForCinema(cinemaId)
                .pipe(
                    map((data: IScreeningsApiResponse) => {
                        const screenings = data.content.filter(screening=> screening.screenName === screenName);
                        return AppActions.fetchCinemaScreenScreeningsSuccess({data: screenings});
                    }),
                    catchError((error: HttpErrorResponse) => { this.notificationService.showError(error.message); return EMPTY; }) 
             ))
        ));

        public saveCinemaScreenStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.saveCinemaScreenStart),
            switchMap(({cinemaId,name}) => 
             this.cinemasService.saveScreen(cinemaId, {name})
                .pipe(
                    map(() => {
                        this.notificationService.showSuccess("Screen saved successfully");
                        return AppActions.fetchCinemaScreensStart({cinemaId});
                    }),
                    catchError((error: HttpErrorResponse) => { this.notificationService.showError(error.message); return EMPTY; }) 
             ))
        ));

        public saveCinemaScreenScreeningStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.saveCinemaScreenScreeningStart),
            switchMap(({cinemaId, screenId, screenName, movieId, startTime}) => 
             this.cinemasService.saveScreening(cinemaId, screenId, {movieId, startTime})
                .pipe(
                    map(() => {
                        this.notificationService.showSuccess("Screening saved successfully");
                        return AppActions.fetchCinemaScreenScreeningsStart({cinemaId, screenName});
                    }),
                    catchError((error: HttpErrorResponse) => { this.notificationService.showError(error.message); return EMPTY; }) 
             ))
        ));

        

}

