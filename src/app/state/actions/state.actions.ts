import { createAction, props, union } from "@ngrx/store";
import { IBookingsApiResponse, ICinemasApiResponse, IMoviesApiResponse } from "src/app/intefaces";

export const fetchDashboardInfo = createAction('[Dashboard] Fetch Info');

export const fetchCinemasStart = createAction('[Cinemas] Fetch Start', props<{isGetAll: boolean, isGetAlsoScreens: boolean, pageNumber: number}>());
export const fetchCinemasSuccess = createAction('[Cinemas] Fetch Success', props<{isGetAll: boolean, isGetAlsoScreens: boolean, data: ICinemasApiResponse}>());
export const fetchMoviesStart = createAction('[Movies] Fetch Start', props<{isGetAll: boolean, pageNumber: number}>());
export const fetchMoviesSuccess = createAction('[Movies] Fetch Success', props<{isGetAll: boolean, data: IMoviesApiResponse}>());
export const fetchBookingsStart = createAction('[Bookings] Fetch Start', props<{isGetAll: boolean, pageNumber: number}>());
export const fetchBookingsSuccess = createAction('[Bookings] Fetch Success', props<{isGetAll: boolean, data: IBookingsApiResponse}>());

export const AppActions = {
    fetchDashboardInfo,
    fetchCinemasStart,
    fetchCinemasSuccess,
    fetchMoviesStart,
    fetchMoviesSuccess,
    fetchBookingsStart,
    fetchBookingsSuccess
};

const appActionsUnion = union(AppActions);

export type AppActionsType = typeof appActionsUnion;