import { IApiResponse } from './api-response.interface';

export interface IScreensApiResponse extends IApiResponse {
  content: IScreensApiContent[];
}

export interface IScreensApiContent {
  id: number;
  name: string;
}
