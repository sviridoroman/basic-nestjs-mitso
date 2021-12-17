import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class ExpressLoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    res.on('close', () => {
      if (res.statusCode < 400) {
        const message = this.getLoggerInfo(start)(req, res);
        this.logger.info(message);
      }
      if (res.statusCode >= 400) {
        const message = this.getLoggerError(start)(req, res);
        this.logger.error(message);
      }
    });

    next();
  }

  getLoggerInfo(startTime: number, separator: string = '\n') {
    return (req: Request, res: Response) =>
      [
        '',
        `Method: ${req.method}`,
        `URL: ${req.originalUrl}`,
        `Code: ${res.statusCode}`,
        `Time: ${Date.now() - startTime}ms`,
        `Params: ${JSON.stringify(req.params)}`,
        `Body: ${JSON.stringify(req.body)}`,
        // `Response: ${JSON.stringify(payload)}`,
        '',
      ].join(separator);
  }

  getLoggerError(startTime: number) {
    return (req: Request, res: Response) =>
      this.getLoggerInfo(startTime)(req, res);
  }
}
