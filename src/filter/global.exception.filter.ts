import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch() // 모든 에러 받음
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // exception 타입 명시
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // 배열, 문자열 관리
    let customMessage: string[] | string = 'INTERNAL_SERVER_ERROR';
    if (exception instanceof HttpException) {
      customMessage =
        typeof exception.getResponse() === 'object'
          ? exception.getResponse()['message']
          : exception.message;
    } else {
      customMessage = 'INTERNAL_SERVER_ERROR';
      this.logger.error(exception);
    }

    response.status(status).json({
      statusCode: status,
      message: customMessage,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
