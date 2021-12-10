import { createFeatureSelector, createSelector, MemoizedSelector } from "@ngrx/store";
import { IBookingsApiResponse, ICinemaContent, ICinemasApiResponse, IMoviesApiResponse } from "src/app/intefaces";
import { AppState } from "../reducers";
import { appFeatureName } from "../state";

export const getAppState: MemoizedSelector<any, AppState> = createFeatureSelector<AppState>(appFeatureName);

export const getSelectedCinema: MemoizedSelector<any, ICinemaContent | undefined> = createSelector(getAppState, ({selectedCinema}) => selectedCinema);

export const getCinemas: MemoizedSelector<any, ICinemasApiResponse | undefined> = createSelector(getAppState, ({cinemas}) => cinemas);
export const getCinemasCount: MemoizedSelector<any, number> = createSelector(getAppState, ({cinemas}) => cinemas?.totalElements ?? 0);

export const getMovies: MemoizedSelector<any, IMoviesApiResponse | undefined> = createSelector(getAppState, ({movies}) => movies);
export const getMoviesCount: MemoizedSelector<any, number> = createSelector(getAppState, ({movies}) => movies?.totalElements ?? 0);

export const getBookings: MemoizedSelector<any, IBookingsApiResponse | undefined> = createSelector(getAppState, ({bookings}) => bookings);
export const getBookingsCount: MemoizedSelector<any, number> = createSelector(getAppState, ({bookings}) => bookings?.totalElements ?? 0);
