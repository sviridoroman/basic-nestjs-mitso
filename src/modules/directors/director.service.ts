import { Injectable, NotFoundException } from '@nestjs/common';

import { DirectorRepository } from './director.repository';
import { FilmRepository } from '../films/film.repository';

import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';

@Injectable()
export class DirectorsService {
  constructor(
    private readonly directorRepository: DirectorRepository,
    private readonly filmRepository: FilmRepository,
  ) {}

  async create (payload: CreateDirectorDto) {
  const directorCreatable = { ...payload };
  const director = this.directorRepository.createNew(directorCreatable);
  return this.directorRepository.save(director);  
  }

  getAll() {
    return this.directorRepository.getAll();
  }

  async getById(id: string ){
    const director = await this.directorRepository.getById(id);
    if (!director) throw new NotFoundException('Director not found');
    return director;
  }

  async update(id: string, payload: UpdateDirectorDto) {
    const director = await this.directorRepository.getById(id);
    if (!director) throw new NotFoundException('Director not found');
    const directorUpdatable = { ...payload };
    return this.directorRepository.save({ ...director, ...directorUpdatable });
  }

  async deleteById(id: string) {
    const directorDeletable = await this.directorRepository.getById(id);
    if (!directorDeletable) throw new NotFoundException('Board not found');

    await this.directorRepository.deleteById(id);

    await this.filmRepository.update({ directorId: id }, { directorId: null });

    return directorDeletable;
  }

}
