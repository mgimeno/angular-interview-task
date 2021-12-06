import { IApiResponse } from './api-response.interface';

export interface IMoviesApiResponse extends IApiResponse {
  content: IMoviesApiContent[];
}

export interface IMoviesApiContent {
  id: number;
  name: string;
  runtime?: number;
}
