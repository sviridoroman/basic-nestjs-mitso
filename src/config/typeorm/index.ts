import * as path from 'path';
import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConnectionOptions, createConnection } from 'typeorm';

import config from '../../config.orm';

const options: ConnectionOptions = {
  ...config,
  type: 'postgres',
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectionInterval: 1000,

  entities: [path.join(__dirname, '../../modules/**/*.entity.{ts,js}')],

  migrationsTableName: 'migrations',
  migrations: [path.join(__dirname, '../../database/migrations/*.{ts,js}')],

  seeds: [path.join(__dirname, '../../database/seeds/*.{ts,js}')],
  factories: [path.join(__dirname, '../../database/factories/*.{ts,js}')],

  cli: { entitiesDir: 'src/models', migrationsDir: 'src/migrations' },
};

@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    createConnection(options)
      .then(() => {
        Logger.log(`Database connected`, 'TypeORM', false);
      })
      .catch(() => {
        Logger.error(` Database connect error`, '', 'TypeORM', false);
      });

    return options;
  }
}

export default options;
