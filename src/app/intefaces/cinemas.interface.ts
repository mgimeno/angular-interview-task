import { IApiResponse } from './api-response.interface';

export interface ICinemasApiResponse extends IApiResponse {
  content: ICinemaContent[];
}

export interface ICinemaContent {
  id: number;
  name: string;
  screens: IScreen[];
}

export interface IScreen {
  id: number;
  name: string;
}
