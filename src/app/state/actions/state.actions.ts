import { createAction, props, union } from "@ngrx/store";
import { IBookingsApiResponse, ICinemasApiResponse, IMoviesApiResponse } from "src/app/intefaces";


export const fetchCinemasPageStart = createAction('[Cinemas] Fetch Page Start', props<{pageNumber?: number}>());
export const fetchCinemasPageSuccess = createAction('[Cinemas] Fetch Page Success', props<{data: ICinemasApiResponse}>());
export const fetchMoviesPageStart = createAction('[Movies] Fetch Page Start', props<{pageNumber?: number}>());
export const fetchMoviesPageSuccess = createAction('[Movies] Fetch Page Success', props<{data: IMoviesApiResponse}>());
export const fetchBookingsPageStart = createAction('[Bookings] Fetch Page Start', props<{pageNumber?: number}>());
export const fetchBookingsPageSuccess = createAction('[Bookings] Fetch Page Success', props<{data: IBookingsApiResponse}>());

export const AppActions = {
    fetchCinemasPageStart,
    fetchCinemasPageSuccess,
    fetchMoviesPageStart,
    fetchMoviesPageSuccess,
    fetchBookingsPageStart,
    fetchBookingsPageSuccess
};

const appActionsUnion = union(AppActions);

export type AppActionsType = typeof appActionsUnion;