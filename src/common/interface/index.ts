import { QueryFailedError } from 'typeorm';

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
  type?: string;
  date?: Date | string;
  path?: string;
  errors?: string[];
  takenTime?: string;
}

export interface DbError extends QueryFailedError {
  code?: string;
  detail?: string;
}

export interface ErrorResponse {
  success: false;
  type: 'BUSINESS' | 'VALIDATION' | 'SYSTEM';
  statusCode: number;
  message: string | string[];
  errors?: string[];
  date: Date | string;
  path: string;
  takenTime?: string;
}
