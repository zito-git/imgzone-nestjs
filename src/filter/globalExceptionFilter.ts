import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // exception 타입 정확하게 확인
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // exception 타입 확인하고 customMessage
    let customMessage: string[] | string = 'INTERNAL_SERVER_ERROR';
    if (exception instanceof HttpException) {
      customMessage = exception.getResponse()['message'];
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
