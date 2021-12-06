import { IApiResponse } from './api-response.interface';

export interface IBookingsApiResponse extends IApiResponse {
  content: IBookingsApiContent[];
}

export interface IBookingsApiContent {
  id: number;
}
