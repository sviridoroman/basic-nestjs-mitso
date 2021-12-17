import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { isObject } from 'class-validator';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const statusCode = exception.getStatus();

    const baseResponse = {
      statusCode,
      message: exception.message,
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    const exceptionResponse = exception.getResponse();
    const resultResponse = isObject(exceptionResponse)
      ? { ...baseResponse, ...exceptionResponse }
      : { ...baseResponse };

    response.status(statusCode).send(resultResponse);
  }
}
