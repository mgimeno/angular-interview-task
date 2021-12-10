import { IApiResponse } from './api-response.interface';

export interface IScreeningsApiResponse extends IApiResponse {
  content: IScreeningContent[];
}

export interface IScreeningContent {
  id: number;
  cinemaName: string;
  screenName: string;
  start?: Date;
  movie: IMovie;
}

export interface IMovie {
  id: number;
  name: string;
  runtime?: number;
}
