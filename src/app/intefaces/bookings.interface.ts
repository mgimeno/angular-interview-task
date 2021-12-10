import { IApiResponse } from './api-response.interface';

export interface IBookingsApiResponse extends IApiResponse {
  content: IBookingContent[];
}

export interface IBookingContent {
  id: number;
}
