import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { IMoviesApiResponse } from '../intefaces';
import { ApiService} from './api.service';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {

  private readonly endpoint: string = 'movies';

  constructor(private apiService: ApiService) {}

   get(pageNumber?: number): Observable<IMoviesApiResponse>{
    return this.apiService.get<IMoviesApiResponse>(this.endpoint, pageNumber);
  }

    save(payload: {name: string, runtime: number}): Observable<any>{
    return this.apiService.put<any>(this.endpoint, payload);
  }
}
