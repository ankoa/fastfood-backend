import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse, PaginationMeta } from '../interface';
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
  private readonly logger = new Logger(TransformInterceptor.name);

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

      ...(partial.data !== undefined && { data: partial.data }),
      ...(partial.meta && { meta: partial.meta }),

      path: request.url,
      date: new Date().toLocaleString('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour12: false,
      }),
      takenTime: `${Date.now() - request['startTime']}ms`,
    };
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
      map((data: T | ApiResponse<T>): ApiResponse<T> => {
        const statusCode = response.statusCode ?? 200;
        /*  console.log('Response data:', data); */
        // Case 1: đã là ApiResponse
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

        // Case 2: dạng có data + meta (pagination)
        if (typeof data === 'object' && data !== null && 'data' in data) {
          const d = data as {
            data?: T;
            message?: string;
            meta?: PaginationMeta;
          };

          return this.buildResponse<T>(
            {
              success: true,
              statusCode,
              message: d.message ?? this.getMessage(method, resource, true),
              data: (d.data ?? null) as T,
              meta: d.meta,
            },
            request,
          );
        }
        if (
          typeof data === 'object' &&
          data !== null &&
          'message' in data &&
          !('data' in data)
        ) {
          return this.buildResponse<T>(
            {
              success: true,
              statusCode,
              message: data.message as string,
              /* data: null as T, */
            },
            request,
          );
        }
        // Case 3: data thường
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
    );
  }
}
