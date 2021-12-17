import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from 'winston';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  // Used "Observable<any>" as in the documentation
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();

    const host = context.switchToHttp();
    const request = host.getRequest<Request>();
    const response = host.getResponse<Response>();

    return next.handle().pipe(
      tap(
        () => {
          const message = this.getLoggerInfo(start)(request, response);
          this.logger.info(message);
        },
        (error) => {
          const message = this.getLoggerError(start)(request, response, error);
          this.logger.error(message);
        },
      ),
    );
  }

  getLoggerInfo(startTime: number, separator: string = '\n') {
    return (req: Request, res: Response) =>
      [
        '',
        `Method: ${req.method}`,
        `URL: ${req.url}`,
        `Code: ${res.statusCode}`,
        `Time: ${Date.now() - startTime}ms`,
        `Params: ${JSON.stringify(req.params || {})}`,
        `Body: ${JSON.stringify(req.body || {})}`,
        '',
      ].join(separator);
  }

  getLoggerError(startTime: number, separator: string = '\n') {
    return (req: Request, _res: Response, error: HttpException) =>
      [
        '',
        `Method: ${req.method}`,
        `URL: ${req.url}`,
        `Code: ${error.getStatus()}`,
        `Time: ${Date.now() - startTime}ms`,
        `Params: ${JSON.stringify(req.params || {})}`,
        `Body: ${JSON.stringify(req.body || {})}`,
        '',
      ].join(separator);
  }
}
