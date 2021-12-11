import { IBookingContent, ICinemaContent, IMovieContent, IScreenContent } from ".";


export interface IStateSection {
  elements: any[],
  isLoading: boolean,
  pageNumber: number,
  pageSize: number | undefined,
  totalPages: number | undefined,
  totalElements: number | undefined
}

export interface ICinemasState extends IStateSection{
  elements: ICinemaContent[];
}

export interface IMoviesState extends IStateSection{
  elements: IMovieContent[];
}

export interface IScreensState extends IStateSection{
  elements: IScreenContent[];
}

export interface IBookingsState extends IStateSection{
  elements: IBookingContent[];
}