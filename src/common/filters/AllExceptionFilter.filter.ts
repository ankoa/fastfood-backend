import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { DbError, ErrorResponse } from '../interface';
import {
  DatabaseErrorHandler,
  DatabaseErrorType,
} from '../utils/database-error.util';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Lỗi hệ thống';
    let errors: string[] | undefined;
    let type: 'BUSINESS' | 'VALIDATION' | 'SYSTEM' = 'SYSTEM';

    // ======================
    // 1. HTTP EXCEPTION
    // ======================
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      type = 'BUSINESS';

      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null) {
        const r = res as {
          message?: string | string[];
          error?: string;
        };

        if (Array.isArray(r.message)) {
          type = 'VALIDATION';
          message = 'Dữ liệu không hợp lệ';
          errors = r.message;
        } else {
          message = r.message || r.error || 'Có lỗi xảy ra';
        }
      }

      this.logger.warn(
        `[${request.method}] ${request.url} - ${JSON.stringify(message)}`,
      );
    }

    // ======================
    // 2. DATABASE ERROR
    // ======================
    else if (exception instanceof QueryFailedError) {
      const err = exception as DbError;
      const errorType = DatabaseErrorHandler.getErrorType(err);

      if (errorType === DatabaseErrorType.UNIQUE_VIOLATION) {
        const field = DatabaseErrorHandler.getField(err.detail) || 'field';

        status = HttpStatus.CONFLICT;
        message = 'Dữ liệu đã tồn tại';
        errors = [`${field} đã tồn tại trong hệ thống`];
        type = 'BUSINESS';

        this.logger.warn(
          `[${request.method}] ${request.url} - UNIQUE ERROR: ${err.detail}`,
        );
      } else if (errorType === DatabaseErrorType.FOREIGN_KEY_VIOLATION) {
        status = HttpStatus.BAD_REQUEST;
        message = 'Lỗi ràng buộc dữ liệu';
        type = 'BUSINESS';

        this.logger.warn(
          `[${request.method}] ${request.url} - FOREIGN KEY ERROR: ${err.detail}`,
        );
      } else {
        status = HttpStatus.BAD_REQUEST;
        message = 'Lỗi dữ liệu từ database';
        type = 'BUSINESS';

        this.logger.error(
          `[${request.method}] ${request.url} - DB ERROR`,
          JSON.stringify(err),
        );
      }
    }

    // ======================
    // 3. SYSTEM ERROR
    // ======================
    else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Lỗi hệ thống';
      type = 'SYSTEM';

      this.logger.error(
        `[${request.method}] ${request.url}`,
        exception instanceof Error
          ? exception.stack
          : JSON.stringify(exception),
      );
    }

    // ======================
    // RESPONSE
    // ======================
    const responseBody: ErrorResponse = {
      success: false,
      type,
      statusCode: status,
      message,
      date: new Date().toLocaleString('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour12: false,
      }),
      path: request.url,
      takenTime: `${Date.now() - request['startTime']}ms`,
    };

    if (errors) {
      responseBody.errors = errors;
    }

    response.status(status).json(responseBody);
  }
}
