// Base DTOs for common patterns

export interface IBaseDTO {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPaginationDTO {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IPaginatedResponseDTO<T> {
  data: T[];
  pagination: IPaginationDTO;
}

export interface IApiResponseDTO<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface IFilterDTO {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// Generic query params
export interface IQueryParamsDTO extends IFilterDTO {
  [key: string]: string | number | boolean | undefined;
}
