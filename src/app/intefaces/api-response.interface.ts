export interface IApiResponse {
  pageable: IPageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: ISort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface IPageable {
  sort: IPageableSort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface ISort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface IPageableSort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}
