import { createFeatureSelector, createSelector, MemoizedSelector } from "@ngrx/store";
import { AppConstants } from "src/app/constants";
import { IBookingsState, ICinemasState, IDashboardTile, IMoviesState, IScreensState } from "src/app/intefaces";
import { ISelectedCinemaState } from "src/app/intefaces/selected-cinema-state.interface";
import { AppState } from "../reducers";
import { appFeatureName } from "../state";

export const getAppState: MemoizedSelector<any, AppState> = createFeatureSelector<AppState>(appFeatureName);

export const getSelectedCinema: MemoizedSelector<any, ISelectedCinemaState> = createSelector(getAppState, ({selectedCinema}) => selectedCinema);

export const getCinemas: MemoizedSelector<any, ICinemasState> = createSelector(getAppState, ({cinemas}) => cinemas);
export const getIsLoadingCinemas: MemoizedSelector<any, boolean> = createSelector(getCinemas, ({isLoading}) => isLoading);
export const getCinemasPageNumber: MemoizedSelector<any, number> = createSelector(getCinemas, ({pageNumber}) => pageNumber);

export const getMovies: MemoizedSelector<any, IMoviesState> = createSelector(getAppState, ({movies}) => movies);
export const getIsLoadingMovies: MemoizedSelector<any, boolean> = createSelector(getMovies, ({isLoading}) => isLoading);
export const getMoviesPageNumber: MemoizedSelector<any, number> = createSelector(getMovies, ({pageNumber}) => pageNumber);

export const getBookings: MemoizedSelector<any, IBookingsState> = createSelector(getAppState, ({bookings}) => bookings);
export const getIsLoadingBookings: MemoizedSelector<any, boolean> = createSelector(getBookings, ({isLoading}) => isLoading);

export const getScreens: MemoizedSelector<any, IScreensState> = createSelector(getAppState, ({screens}) => screens);
export const getIsLoadingScreens: MemoizedSelector<any, boolean> = createSelector(getScreens, ({isLoading}) => isLoading);

export const getDashboardTiles: MemoizedSelector<any, IDashboardTile[]> = createSelector(getAppState, (state) => {
    const tiles = AppConstants.initialDashboardTilesInfo;
    const cinemasTile = tiles.find(tile => tile.id === "cinemas")!;
    const moviesTile = tiles.find(tile => tile.id === "movies")!;
    const screensTile = tiles.find(tile => tile.id === "screens")!;
    const bookingsTile = tiles.find(tile => tile.id === "bookings")!;
    cinemasTile.count = state.cinemas.totalElements;
    cinemasTile.isLoading = state.cinemas.isLoading;
    moviesTile.count = state.movies.totalElements;
    moviesTile.isLoading = state.movies.isLoading;
    screensTile.count = state.screens.isLoading ? undefined : state.screens.elements.length;
    screensTile.isLoading = state.screens.isLoading;
    bookingsTile.count = state.bookings.totalElements;
    bookingsTile.isLoading = state.bookings.isLoading;

    return tiles;
});