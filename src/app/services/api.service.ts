import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpMethodsEnum } from '../enums';
import { AppConstants } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  public get<T>(endpoint: string, pageNumber?: number, pageSize?: number): Observable<T>{
    const params: any = {
    };
    if(pageNumber){
      params.page = pageNumber;
    }
    if(pageSize){
      params.size = pageSize;
    }
    else if(localStorage.getItem(`${environment.localStoragePrefix}api-use-max-page-size`)?.toString() === "true"){
      params.size = AppConstants.MAX_API_PAGE_SIZE;
    }
    return this.call<T>(HttpMethodsEnum.GET,
      endpoint, null, params);
  }

  public put<T>(endpoint: string, payload: any): Observable<T>{
    return this.call<T>(HttpMethodsEnum.PUT,
      endpoint, payload);
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
