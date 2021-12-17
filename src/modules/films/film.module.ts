import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilmRepository } from './film.repository';
import { FilmsService } from './film.service';
import { FilmsController } from './film.controller';

import { ResultRepository } from '../results/result.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FilmRepository, ResultRepository])],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
