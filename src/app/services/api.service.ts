import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  call(
    method: string,
    urlPath: string,
    payload: any = null,
    params: any = null
  ): Observable<any> {
    const headers: any = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const httpOptions: any = {
      params,
      headers,
      body: payload,
    };

    return this.httpClient.request(
      method,
      `${environment.apiURL}${urlPath}`,
      httpOptions
    );
  }
}
