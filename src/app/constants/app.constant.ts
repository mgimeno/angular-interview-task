import { IDashboardTile } from "../intefaces";

export namespace AppConstants {

  export const MAX_NAME_LENGTH = 20;
  export const NOTIFICATION_DURATION_MILLISECONDS = 3000;
  export const NOTIFICATION_ERROR_DURATION_MILLISECONDS = 10000;
  export const MAX_API_PAGE_SIZE = 2000;

  export const AVAILABLE_LANGUAGE_CODES: any = {
    english: 'en_GB',
    spanish: 'es_ES',
    german: 'de_AT',
  };

  export const initialDashboardTilesInfo: IDashboardTile[] = [
    {
      id: 'cinemas',
      title: $localize`:@@menu.cinemas:Cinemas`,
      onClickPath: 'cinemas',
      class: 'green',
      count: undefined,
      isLoading: true
    },
    {
      id: 'movies',
      title: $localize`:@@menu.movies:Movies`,
      onClickPath: 'movies',
      class: 'purple',
      count: undefined,
      isLoading: true
    },
    {
      id: 'screens',
      title: $localize`:@@menu.screens:Screens`,
      onClickPath: undefined,
      class: 'red',
      count: undefined,
      isLoading: true
    },
    {
      id: 'bookings',
      title: $localize`:@@menu.bookings:Bookings`,
      onClickPath: 'bookings',
      class: 'blue',
      count: undefined,
      isLoading: true
    },
  ];

}
