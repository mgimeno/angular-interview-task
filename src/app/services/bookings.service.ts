import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { IBookingsApiResponse, IBookingContent } from '../intefaces';
import { ApiService} from './api.service';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {

  private readonly endpoint: string = 'bookings';

  constructor(private apiService: ApiService) {}

   get(pageNumber?: number): Observable<IBookingsApiResponse>{
    return this.apiService.get<IBookingsApiResponse>(this.endpoint, pageNumber);
  }
}
