import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DirectorRepository } from './director.repository';
import { DirectorsService } from './director.service';
import { DirectorsController } from './director.controller';

import { FilmRepository } from '../films/film.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DirectorRepository, FilmRepository])],
  controllers: [DirectorsController],
  providers: [DirectorsService],
})
export class DirectorsModule {}
