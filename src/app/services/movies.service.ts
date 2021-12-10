import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { IMovieContent, IMoviesApiResponse } from '../intefaces';
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

  getAll(): IMovieContent[]{
    return this.apiService.getAll<IMovieContent>(this.endpoint);
  }
}
