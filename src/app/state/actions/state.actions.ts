import { createAction, props, union } from "@ngrx/store";
import { IBookingsApiResponse, ICinemaContent, ICinemasApiResponse, IMoviesApiResponse, IScreenContent, IScreeningContent } from "src/app/intefaces";

export const fetchDashboardInfo = createAction('[Dashboard] Fetch Info');

export const fetchCinemasStart = createAction('[Cinemas] Fetch Start', props<{isGetAll: boolean, isGetAlsoScreens: boolean, pageNumber: number}>());
export const fetchCinemasSuccess = createAction('[Cinemas] Fetch Success', props<{isGetAll: boolean, isGetAlsoScreens: boolean, data: ICinemasApiResponse}>());
export const saveCinemaStart = createAction('[Cinemas] Save Start', props<{name: string}>());

export const fetchMoviesStart = createAction('[Movies] Fetch Start', props<{isGetAll: boolean, pageNumber: number}>());
export const fetchMoviesSuccess = createAction('[Movies] Fetch Success', props<{isGetAll: boolean, data: IMoviesApiResponse}>());
export const saveMovieStart = createAction('[Movies] Save Start', props<{name: string, runtime: number}>());

export const fetchBookingsStart = createAction('[Bookings] Fetch Start', props<{isGetAll: boolean, pageNumber: number}>());
export const fetchBookingsSuccess = createAction('[Bookings] Fetch Success', props<{isGetAll: boolean, data: IBookingsApiResponse}>());
export const saveBookingStart = createAction('[Bookings] Save Start',  props<{screeningId: number, seat: number}>());

export const fetchCinemaStart = createAction('[Cinema] Fetch Start', props<{id: number}>());
export const fetchCinemaSuccess = createAction('[Cinema] Fetch Success', props<{data: ICinemaContent | undefined}>());
export const fetchCinemaScreensStart = createAction('[Cinema] Fetch Screens Start', props<{cinemaId: number}>());
export const fetchCinemaScreensSuccess = createAction('[Cinema] Fetch Screens Success', props<{data: IScreenContent[]}>());
export const saveCinemaScreenStart = createAction('[Cinema] Save screen Start', props<{cinemaId: number, name: string}>());
export const fetchCinemaScreenScreeningsStart = createAction('[Cinema] Fetch Screen Screenings Start', props<{cinemaId: number, screenName: string}>());
export const fetchCinemaScreenScreeningsSuccess = createAction('[Cinema] Fetch Screen Screenings Success', props<{data: IScreeningContent[]}>());
export const saveCinemaScreenScreeningStart = createAction('[Cinema] Save screen screening Start', props<{cinemaId: number, screenId: number, screenName: string, movieId: number, startTime: string}>());

export const selectScreenStart = createAction('[Cinema] Select Screen Start', props<{cinemaId: number, screenId: number,screenName:string}>());
export const selectScreeningStart = createAction('[Cinema] Select Screening Start', props<{cinemaId: number,screeningId: number}>());

export const AppActions = {
    fetchDashboardInfo,
    fetchCinemasStart,
    fetchCinemasSuccess,
    saveCinemaStart,
    fetchMoviesStart,
    fetchMoviesSuccess,
    saveMovieStart,
    fetchBookingsStart,
    fetchBookingsSuccess,
    saveBookingStart,
    fetchCinemaStart,
    fetchCinemaSuccess,
    fetchCinemaScreensStart,
    fetchCinemaScreensSuccess,
    saveCinemaScreenStart,
    fetchCinemaScreenScreeningsStart,
    fetchCinemaScreenScreeningsSuccess,
    saveCinemaScreenScreeningStart,
    selectScreenStart,
    selectScreeningStart
};

const appActionsUnion = union(AppActions);

export type AppActionsType = typeof appActionsUnion;