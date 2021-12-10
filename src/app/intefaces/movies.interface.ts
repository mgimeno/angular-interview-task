import { IApiResponse } from './api-response.interface';

export interface IMoviesApiResponse extends IApiResponse {
  content: IMovieContent[];
}

export interface IMovieContent {
  id: number;
  name: string;
  runtime?: number;
}
