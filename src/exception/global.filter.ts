import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalFilter<T> implements ExceptionFilter {
  private logger = new Logger(GlobalFilter.name);

  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let customMessage: string[] | string = 'INTERNAL_SERVER_ERROR';

    if (exception instanceof HttpException) {
      customMessage = exception.getResponse()['message'];
    } else {
      customMessage = 'INTERNAL_SERVER_ERROR';
      // 에러 로그 추가
      this.logger.error(exception);
    }

    response.status(status).json({
      statusCode: status,
      message: customMessage,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
