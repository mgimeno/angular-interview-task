import { IApiResponse } from './api-response.interface';

export interface ICinemasApiResponse extends IApiResponse {
  content: ICinemasApiContent[];
}

export interface ICinemasApiContent {
  id: number;
  name: string;
  screens: IApiScreen[];
}

export interface IApiScreen {
  id: number;
  name: string;
}
