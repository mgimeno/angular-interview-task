import { IApiResponse } from './api-response.interface';

export interface IScreeningsApiResponse extends IApiResponse {
  content: IScreeningsApiContent[];
}

export interface IScreeningsApiContent {
  id: number;
  cinemaName: string;
  screenName: string;
  start?: Date;
  movie: IApiMovie;
}

export interface IApiMovie {
  id: number;
  name: string;
  runtime?: number;
}
