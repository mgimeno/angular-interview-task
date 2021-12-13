import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { AppConstants } from '../constants';
import { ICinemaContent, ICinemasApiResponse, IScreeningsApiResponse, IScreensApiResponse } from '../intefaces';
import { ApiService} from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CinemasService {

  private readonly endpoint: string = 'cinemas';

  constructor(private apiService: ApiService) {}

  get(pageNumber?: number): Observable<ICinemasApiResponse>{
    return this.apiService.get<ICinemasApiResponse>(this.endpoint, pageNumber);
  }

  getAll():  Observable<ICinemasApiResponse>{
    return this.apiService.get<ICinemasApiResponse>(this.endpoint, undefined ,AppConstants.MAX_API_PAGE_SIZE );
  }

  getAllScreensForCinema(cinemaId: number): Observable<IScreensApiResponse>{
    return this.apiService.get<IScreensApiResponse>(`${this.endpoint}/${cinemaId}/screens`, undefined ,AppConstants.MAX_API_PAGE_SIZE );
  }

  getAllScreeningsForCinema(cinemaId: number): Observable<IScreeningsApiResponse>{
    return this.apiService.get<IScreeningsApiResponse>(`${this.endpoint}/${cinemaId}/screenings`, undefined ,AppConstants.MAX_API_PAGE_SIZE );
  }

  save(payload: {name: string}): Observable<any>{
    return this.apiService.put<any>(this.endpoint, payload);
  }

  saveScreen(cinemaId: number,payload: {name: string}): Observable<any>{
    return this.apiService.put<any>(`${this.endpoint}/${cinemaId}/screens`, payload);
  }

  saveScreening(cinemaId: number, screenId: number, payload: {movieId: number, startTime: string}): Observable<any>{
    return this.apiService.put<any>(`${this.endpoint}/${cinemaId}/screens/${screenId}/screenings`, payload);
  }
}
