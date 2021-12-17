import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResultRepository } from './result.repository';
import { ResultsService } from './result.service';
import { ResultssController } from './result.controller';


@Module({
  imports: [TypeOrmModule.forFeature([ResultRepository])],
  controllers: [ResultssController],
  providers: [ResultsService],
})
export class ResultsModule {}
