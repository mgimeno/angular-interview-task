import { IDashboardTile } from "../intefaces";

export namespace AppConstants {
  export const AVAILABLE_LANGUAGE_CODES: any = {
    english: 'en_GB',
    spanish: 'es_ES',
    german: 'de_AT',
  };

  export const initialDashboardTilesInfo: IDashboardTile[] = [
    {
      id: 'cinemasCount',
      title: 'Cinemas', //todo translate
      onClickPath: 'cinemas',
      class: 'green',
      count: undefined,
    },
    {
      id: 'moviesCount',
      title: 'Movies',
      onClickPath: 'movies',
      class: 'purple',
      count: undefined,
    },
    {
      id: 'screensCount',
      title: 'Screens',
      onClickPath: undefined,
      class: 'red',
      count: undefined,
    },
    {
      id: 'bookingsCount',
      title: 'Bookings',
      onClickPath: undefined,
      class: 'blue',
      count: undefined
    },
  ];

}
