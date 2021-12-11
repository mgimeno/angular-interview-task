import { IApiResponse } from './api-response.interface';
import { IScreenContent } from './screens.interface';

export interface ICinemasApiResponse extends IApiResponse {
  content: ICinemaContent[];
}

export interface ICinemaContent {
  id: number;
  name: string;
  screens: IScreenContent[];
}
