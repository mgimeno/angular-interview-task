import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpMethodsEnum } from '../enums';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  public get<T>(endpoint: string, pageNumber?: number): Observable<T>{
    const params: any = {
    };
    if(pageNumber){
      params.page = pageNumber;
    }
    return this.call<T>(HttpMethodsEnum.GET,
      endpoint, null, params);
  }

  private call<T>(
    method: string,
    urlPath: string,
    payload: any = null,
    params: any = null
  ): Observable<T> {
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
    ) as unknown as Observable<T>;
  }

}
