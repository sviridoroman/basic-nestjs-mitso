import * as fs from 'fs';
import * as chalk from 'chalk';
import * as YAML from 'yamljs';
import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import {
  InternalServerErrorException,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

import { AppLogger } from './config/logger';

import { PORT, HTTP_ADAPTER, NODE_ENV } from './environments';

const createApp = async (httpAdapter = 'express') => {
  if (httpAdapter === 'fastify') {
    return NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
      { logger: true, bodyParser: true },
    );
  }
  if (httpAdapter === 'express') {
    return NestFactory.create<NestExpressApplication>(AppModule, {
      logger: new AppLogger(),
    });
  }
  throw new InternalServerErrorException();
};

async function bootstrap() {
  try {
    const app = await createApp(HTTP_ADAPTER);

    if (NODE_ENV === 'development') {
      const config = new DocumentBuilder()
        .setTitle('Nest NodeJS 2021Q2')
        .setDescription('NestJS, TypeORM, PostgresDB')
        .setVersion('1.0')
        .addTag('nest')
        .build();
      const document = SwaggerModule.createDocument(app, config);
      fs.writeFileSync('doc/api.yaml', YAML.stringify(document, 10, 2));
      SwaggerModule.setup('doc', app, document);
    }

    // httpAdapter === 'express'
    if (HTTP_ADAPTER === 'express') {
      app.use(express.json());
    }

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT, '0.0.0.0');

    Logger.log(
      ` Server is listening on port ${(`${PORT}`)}`,
      `Bootstrap (${HTTP_ADAPTER})`,
    );
  } catch (error) {
    Logger.error(`Error starting server, ${error}`, '', 'Bootstrap', false);
    throw new InternalServerErrorException(error);
  }
}
bootstrap().catch(() => {
  process.exit(1);
});
