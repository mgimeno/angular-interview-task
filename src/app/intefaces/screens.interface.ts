import { IApiResponse } from './api-response.interface';

export interface IScreensApiResponse extends IApiResponse {
  content: IScreenContent[];
}

export interface IScreenContent {
  id: number;
  name: string;
}
