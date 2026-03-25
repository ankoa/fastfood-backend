export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  data?: T | null;
  meta?: PaginationMeta;
  message?: string;
  date?: Date;
  path?: string;
  timestamp?: string;
  errors?: string[];
}
