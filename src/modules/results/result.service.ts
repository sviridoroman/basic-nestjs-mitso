import { Injectable, NotFoundException } from '@nestjs/common';

import { ResultRepository } from './result.repository';

import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';

@Injectable()
export class ResultsService {
  constructor(
    private readonly resultRepository: ResultRepository,
  ) {}

  async create (filmId:string,payload: CreateResultDto) {
  const resultCreatable = { ...payload, filmId};
  const result = this.resultRepository.createNew(resultCreatable);
  return this.resultRepository.save(result);  
  }

  getAll() {
    return this.resultRepository.getAll();
  }

  async getById(id: string ){
    const result = await this.resultRepository.getById(id);
    if (!result) throw new NotFoundException('Result not found');
    return result;
  }

  async getAllByFilmId(filmId: string) {
    return this.resultRepository.getAllByFilmId(filmId);
  }


  async update(id: string, payload: UpdateResultDto) {
    const result = await this.resultRepository.getById(id);
    if (!result) throw new NotFoundException('Result not found');
    const resultUpdatable = { ...payload };
    return this.resultRepository.save({ ...result, ...resultUpdatable });
  }

  async deleteById(id: string) {
    const resultDeletable = await this.resultRepository.getById(id);
    if (!resultDeletable) throw new NotFoundException('Result not found');
    await this.resultRepository.deleteById(id);
    return resultDeletable;
  }

}

