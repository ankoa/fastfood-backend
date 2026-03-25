import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ApiResponse, PaginationMeta } from '../interface/index';
import { Request, Response } from 'express';
import { Reflector } from '@nestjs/core';
import { RESOURCE_KEY } from '../decorators/resource.decorator';

function isApiResponse<T>(data: unknown): data is ApiResponse<T> {
  return (
    typeof data === 'object' &&
    data !== null &&
    'success' in data &&
    'data' in data &&
    'statusCode' in data &&
    'message' in data
  );
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  ApiResponse<T>
> {
  constructor(private readonly reflector: Reflector) {}

  private getMessage(
    method: string,
    resource: string | undefined,
    success: boolean,
  ): string {
    const name = resource ?? 'dữ liệu';

    const actionMap: Record<string, string> = {
      GET: 'Lấy',
      POST: 'Tạo',
      PUT: 'Cập nhật',
      PATCH: 'Cập nhật',
      DELETE: 'Xóa',
    };

    const action = actionMap[method] ?? '';

    return success
      ? `${action} ${name} thành công`
      : `${action} ${name} thất bại`;
  }

  private buildResponse<K>(
    partial: Partial<ApiResponse<K>>,
    request: Request,
  ): ApiResponse<K> {
    return {
      success: partial.success ?? true,
      statusCode: partial.statusCode ?? 200,
      message: partial.message ?? 'Thành công',
      data: partial.data ?? null,
      meta: partial.meta,
      errors: partial.errors,
      path: request.url,
      timestamp: new Date().toISOString(),
    };
  }

  private extractError(err: unknown): {
    message?: string;
    errors?: string[];
  } {
    if (err instanceof HttpException) {
      const res: unknown = err.getResponse();

      if (typeof res === 'string') {
        return { message: res };
      }

      if (typeof res === 'object' && res !== null) {
        const r = res as {
          message?: string | string[];
          error?: string;
        };

        if (Array.isArray(r.message)) {
          return { errors: r.message };
        }

        if (typeof r.message === 'string') {
          return { message: r.message };
        }

        if (r.error) {
          return { message: r.error };
        }
      }
    }

    if (err instanceof Error) {
      return { errors: [err.message] };
    }

    return {};
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiResponse<T>> {
    const http = context.switchToHttp();

    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();

    const method = request.method;

    const resource = this.reflector.get<string>(
      RESOURCE_KEY,
      context.getHandler(),
    );

    return next.handle().pipe(
      /* pipe xử lý respone controller trả về  */
      map((data: T | ApiResponse<T>): ApiResponse<T> => {
        const statusCode = response.statusCode ?? 200;

        // Case 1
        if (isApiResponse<T>(data)) {
          return this.buildResponse<T>(
            {
              ...data,
              statusCode: data.statusCode ?? statusCode,
              message: data.message ?? this.getMessage(method, resource, true),
            },
            request,
          );
        }

        // Case 2 (pagination or custom)
        if (typeof data === 'object' && data !== null && 'data' in data) {
          const d = data as {
            data?: T;
            message?: string;
            meta?: unknown;
          };

          return this.buildResponse<T>(
            {
              success: true,
              statusCode,
              message: d.message ?? this.getMessage(method, resource, true),
              data: (d.data ?? null) as T,
              meta: d.meta as PaginationMeta,
            },
            request,
          );
        }

        // Case 3
        return this.buildResponse<T>(
          {
            success: true,
            statusCode,
            message: this.getMessage(method, resource, true),
            data: (data ?? null) as T,
          },
          request,
        );
      }),

      catchError((err: unknown) => {
        const statusCode = err instanceof HttpException ? err.getStatus() : 500;

        const { message, errors } = this.extractError(err);

        return throwError(
          () =>
            new HttpException(
              this.buildResponse<null>(
                {
                  success: false,
                  statusCode,
                  message: message ?? this.getMessage(method, resource, false),
                  errors,
                  data: null,
                },
                request,
              ),
              statusCode,
            ),
        );
      }),
    );
  }
}
