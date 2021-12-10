import { Action, createReducer, on } from "@ngrx/store";
import { IBookingsApiResponse, ICinemaContent, ICinemasApiResponse, IMoviesApiResponse } from "src/app/intefaces";
import { AppActions } from "../actions";

export interface AppState{
    cinemas: ICinemasApiResponse | undefined;
    movies: IMoviesApiResponse | undefined;
    bookings: IBookingsApiResponse | undefined;
    selectedCinema: ICinemaContent | undefined;
    
}

export const initialState: AppState = {
    cinemas: undefined,
    movies: undefined,
    bookings: undefined,
    selectedCinema: undefined
};

export const reducer = createReducer(
    initialState,
    on(AppActions.fetchCinemasPageSuccess, (state, {data}) => ({
        ...state,
        cinemas: data
    })),
    on(AppActions.fetchMoviesPageSuccess, (state, {data}) => ({
        ...state,
        movies: data
    })),
    on(AppActions.fetchBookingsPageSuccess, (state, {data}) => ({
        ...state,
        bookings: data
    }))
);

export const appReducer = (
    state: AppState | undefined,
    action: Action) : AppState => {
        return reducer(state,action);
};