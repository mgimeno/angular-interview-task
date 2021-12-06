import { Component } from '@angular/core';
import { AppConstants } from 'src/app/constants/app.constant';
import { HttpMethodsEnum } from 'src/app/enums/http-methods.enum';
import { IApiResponse } from 'src/app/intefaces/api-response.interface';
import { ICinemasApiResponse } from 'src/app/intefaces/cinemas-api-response.interface';
import { IMoviesApiResponse } from 'src/app/intefaces/movies-api-response.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  // todo create interface
  tiles: any[] = [
    {
      title: 'Cinemas',
      apiEndpoint: 'cinemas',
      class: 'green',
      isLoading: true,
      number: 0,
    },
    {
      title: 'Screens',
      apiEndpoint: null,
      class: 'blue',
      isLoading: true,
      number: 0,
    },
    {
      title: 'Movies',
      apiEndpoint: 'movies',
      class: 'purple',
      isLoading: true,
      number: 0,
    },
    {
      title: 'Bookings',
      apiEndpoint: 'bookings',
      class: 'red',
      isLoading: true,
      number: 0,
    },
  ];

  constructor(private apiService: ApiService) {
    this.tiles.forEach((tile) => {
      if (tile.apiEndpoint) {
        this.callApi(tile, tile.apiEndpoint === 'cinemas' ? 0 : undefined);
      }
    });
  }

  //TODO tile needs type
  callApi = (tile: any, pageNumber?: number) => {
    this.apiService
      .call(
        HttpMethodsEnum.GET,
        `${tile.apiEndpoint}${
          pageNumber !== undefined ? `?page=${pageNumber}` : ''
        }`
      )
      .subscribe((result: IApiResponse) => {
        if (tile.apiEndpoint === 'cinemas') {
          (result as ICinemasApiResponse).content.forEach((cinema) => {
            this.tiles[1].number += cinema.screens.length;
          });
        }
        if (pageNumber !== undefined && pageNumber < result.totalPages - 1) {
          this.callApi(tile, pageNumber + 1);
        } else {
          tile.number = result.totalElements;
          tile.isLoading = false;
          if (tile.apiEndpoint === 'cinemas') {
            const screensTile = this.tiles.find((fTile) => !fTile.apiEndpoint);
            screensTile.isLoading = false;
          }
        }
      });
  };
}
