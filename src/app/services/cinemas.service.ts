import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ICinemasApiResponse } from '../intefaces';
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

  save(payload: {name: string}): Observable<any>{
    return this.apiService.put<any>(this.endpoint, payload);
  }
}
