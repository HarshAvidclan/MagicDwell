export interface PaginationConfigResult {
  TotalCount: number;
}


export interface APIBaseResponse<T> {
  Data: T;
  TotalCount: number;
  ErrorMessage: string[];
  InfoMessage: string[];
  WarningMessage: string[];
  ValidationMessage: string[];
  SuccessMessage: string[];
  HasError: boolean;
  ResponseCode: string;
  StatusCode: number;
}