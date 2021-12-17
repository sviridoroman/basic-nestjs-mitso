import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';

import { UsersModule } from './modules/users/users.module';
import { DirectorsModule } from './modules/directors/director.module';
import { FilmsModule } from './modules/films/film.module';
import { ResultsModule } from './modules/results/result.module';

import { UsersController } from './modules/users/users.controller';
import { DirectorsController } from './modules/directors/director.controller';
import { FilmsController } from './modules/films/film.controller';
import { ResultssController } from './modules/results/result.controller';

import {
  ExpressLoggerMiddleware,
  FastifyLoggerMiddleware,
  HttpExceptionFilter,
  AllExceptionsFilter,
} from './common';
import { TypeormConfigService, WinstonConfigService } from './config';
import { HTTP_ADAPTER } from './environments';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeormConfigService,
    }),
    WinstonModule.forRootAsync({
      useClass: WinstonConfigService,
    }),
    AuthModule,
    UsersModule,
    DirectorsModule,
    FilmsModule,
    ResultsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Alternative way of logging
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: LoggerInterceptor,
    // },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const LoggerMiddleware =
      HTTP_ADAPTER === 'fastify'
        ? FastifyLoggerMiddleware
        : ExpressLoggerMiddleware;
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(UsersController, DirectorsController, FilmsController, ResultssController);
  }
}
