import { Action, createReducer, on } from "@ngrx/store";
import { IBookingsState, ICinemasState, IMoviesState, IScreensState } from "src/app/intefaces";
import { ISelectedCinemaState } from "src/app/intefaces/selected-cinema-state.interface";
import { AppActions } from "../actions";

export interface AppState{
    cinemas: ICinemasState,
    screens: IScreensState,
    movies: IMoviesState;
    bookings: IBookingsState;
    selectedCinema: ISelectedCinemaState;
}

export const initialState: AppState = {
    cinemas: {
        elements: [],
        isLoading: true,
        pageNumber: 0,
        pageSize: undefined,
        totalPages: undefined,
        totalElements: undefined
    },
    screens: {
        elements: [],
        isLoading: true,
        pageNumber: 0,
        pageSize: undefined,
        totalPages: undefined,
        totalElements: undefined
    },
    movies: {
        elements: [],
        isLoading: true,
        pageNumber: 0,
        pageSize: undefined,
        totalPages: undefined,
        totalElements: undefined
    },
    bookings: {
        elements: [],
        isLoading: true,
        pageNumber: 0,
        pageSize: undefined,
        totalPages: undefined,
        totalElements: undefined
    },
    selectedCinema: {
        id: undefined,
        name: undefined,
        screens:undefined,
        screenings: undefined,
        selectedScreen: undefined,
        selectedScreening: undefined,
        isLoading: true,
        isLoadingScreens: false,
        isLoadingScreenings: false
    }
};

export const reducer = createReducer(
    initialState,
    on(AppActions.fetchCinemasStart, (state, {isGetAll,isGetAlsoScreens , pageNumber}) => {
        const cinemas = {...state.cinemas};
        cinemas.isLoading = true;
        cinemas.pageNumber = pageNumber;
        cinemas.totalElements = undefined;
        cinemas.totalPages = undefined;
        const screens = {...state.screens};
        screens.isLoading = isGetAlsoScreens;
        if(!isGetAll || pageNumber === 0){
            cinemas.elements = [];
            screens.elements = [];
        }
        return {
            ...state,
            cinemas,
            screens
        };
    }),
    on(AppActions.fetchMoviesStart, (state, {isGetAll , pageNumber}) => {
        const movies = {...state.movies};
        movies.isLoading = true;
        movies.pageNumber = pageNumber;
        movies.totalElements = undefined;
        movies.totalPages = undefined;
        if(!isGetAll || pageNumber === 0){
            movies.elements = [];
        }
        return {
            ...state,
            movies
        };
    }),
    on(AppActions.fetchBookingsStart, (state, {isGetAll , pageNumber}) => {
        const bookings = {...state.bookings};
        bookings.isLoading = true;
        bookings.pageNumber = pageNumber;
        bookings.totalElements = undefined;
        bookings.totalPages = undefined;
        if(!isGetAll || pageNumber === 0){
            bookings.elements = [];
        }
        return {
            ...state,
            bookings
        };
    }),
    on(AppActions.fetchCinemasSuccess, (state, {isGetAll, isGetAlsoScreens, data}) => {
        const cinemas = {...state.cinemas};
        const screens = {...state.screens};
        const cinemasElements = Object.assign([], cinemas.elements);
        cinemasElements.push(...data.content);
        cinemas.elements = cinemasElements;
        cinemas.totalElements = data.totalElements;
        cinemas.totalPages = data.totalPages;
        cinemas.pageSize = data.size;
        if(isGetAll){
            cinemas.isLoading = cinemas.elements.length !== data.totalElements;
            if(isGetAlsoScreens){
                const screensElements = Object.assign([], screens.elements);
                data.content.forEach(cinema => screensElements.push(...cinema.screens));
                screens.elements = screensElements;
                screens.isLoading = isGetAlsoScreens && isGetAll && cinemas.isLoading;
            }
        }
        else{
            cinemas.isLoading = false;
        }
        return {
            ...state,
            cinemas,
            screens
        };
    }),
    on(AppActions.fetchMoviesSuccess, (state, {isGetAll, data}) => {
        const movies = {...state.movies};
        const moviesElements = Object.assign([], movies.elements);
        moviesElements.push(...data.content);
        movies.elements = moviesElements;
        movies.totalElements = data.totalElements;
        movies.totalPages = data.totalPages;
        movies.pageSize = data.size;
        if(isGetAll){
            movies.isLoading = movies.elements.length !== data.totalElements;
        }
        else{
            movies.isLoading = false;
        }
        return {
            ...state,
            movies
        };
    }),
    on(AppActions.fetchBookingsSuccess, (state, {isGetAll, data}) => {
        const bookings = {...state.bookings};
        const bookingsElements = Object.assign([], bookings.elements);
        bookingsElements.push(...data.content);
        bookings.elements = bookingsElements;
        bookings.totalElements = data.totalElements;
        bookings.totalPages = data.totalPages;
        bookings.pageSize = data.size;
        if(isGetAll){
            bookings.isLoading = bookings.elements.length !== data.totalElements;
        }
        else{
            bookings.isLoading = false;
        }
        return {
            ...state,
            bookings
        };
    }),
    on(AppActions.fetchCinemaStart, (state, {id}) => {
        const selectedCinema = {...state.selectedCinema};
        
        selectedCinema.id = undefined;
        selectedCinema.name = undefined;
        selectedCinema.screens = undefined;
        selectedCinema.screenings = undefined; 
        selectedCinema.selectedScreen = undefined;
        selectedCinema.selectedScreening = undefined;
        selectedCinema.isLoading = true;
        selectedCinema.isLoadingScreens = false;
        selectedCinema.isLoadingScreenings = false;

        return {
            ...state,
            selectedCinema
        };
    }),
    on(AppActions.fetchCinemaSuccess, (state, {data}) => {
        const selectedCinema = {...state.selectedCinema};
        
        selectedCinema.id = data?.id;
        selectedCinema.name = data?.name;
        selectedCinema.isLoading = false;

        return {
            ...state,
            selectedCinema
        };
    }),
    on(AppActions.fetchCinemaScreensStart, (state, {cinemaId}) => {
        const selectedCinema = {...state.selectedCinema};
        
        selectedCinema.screens = undefined;
        selectedCinema.isLoadingScreens = true;
        selectedCinema.selectedScreening = undefined;
        selectedCinema.screenings = undefined;

        return {
            ...state,
            selectedCinema
        };
    }),
    on(AppActions.fetchCinemaScreensSuccess, (state, {data}) => {
        const selectedCinema = {...state.selectedCinema};
        
        selectedCinema.screens = data;
        selectedCinema.isLoadingScreens = false;

        return {
            ...state,
            selectedCinema
        };
    }),
    on(AppActions.fetchCinemaScreenScreeningsStart, (state, {cinemaId, screenName}) => {
        const selectedCinema = {...state.selectedCinema};
        
        selectedCinema.screenings = undefined;
        selectedCinema.isLoadingScreenings = true;

        return {
            ...state,
            selectedCinema
        };
    }),
    on(AppActions.fetchCinemaScreenScreeningsSuccess, (state, {data}) => {
        const selectedCinema = {...state.selectedCinema};
        
        selectedCinema.screenings = data;
        selectedCinema.isLoadingScreenings = false;

        return {
            ...state,
            selectedCinema
        };
    }),
    on(AppActions.selectScreenStart, (state, {cinemaId, screenId,screenName}) => {
        const selectedCinema = {...state.selectedCinema};

        const screen = selectedCinema.screens?.find(screen=> screen.id === screenId);
        selectedCinema.selectedScreen = screen;
        selectedCinema.selectedScreening = undefined;
        selectedCinema.screenings = undefined;

        return {
            ...state,
            selectedCinema
        };
    }),
    on(AppActions.selectScreeningStart, (state, {cinemaId, screeningId}) => {
        const selectedCinema = {...state.selectedCinema};

        const screening = selectedCinema.screenings?.find(screening=> screening.id === screeningId);
        selectedCinema.selectedScreening = screening;

        return {
            ...state,
            selectedCinema
        };
    }),
    
);

export const appReducer = (
    state: AppState | undefined,
    action: Action) : AppState => {
        return reducer(state,action);
};