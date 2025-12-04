export interface PaginationConfigInput {
  PageNumber: number;
  PageSize: number;
  SortBy?: string | null;
  SortDirection?: "ASC" | "DESC" | null;
  SearchTerm?: string | null;
  [key: string]: any;
}