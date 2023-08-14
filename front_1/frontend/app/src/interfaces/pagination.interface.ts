// import {
//   ColumnFiltersState,
//   PaginationState,
//   SortingState,
// } from '@tanstack/react-table';

export interface Pagination {
  page?: number;
  limit?: number;
  orderBy?: string;
  orderDirection?: string;
}

export interface PaginatedList<T> {
  items: T[];
  meta: {
    itemCount: number;
    totalItems?: number;
    itemsPerPage: number;
    totalPages?: number;
    currentPage: number;
  };
  links: {
    first?: string;
    previous?: string;
    next?: string;
    last?: string;
  };
}
