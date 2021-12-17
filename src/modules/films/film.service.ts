import { Injectable, NotFoundException } from '@nestjs/common';

import { FilmRepository } from './film.repository';
import { ResultRepository } from '../results/result.repository';

import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';

@Injectable()
export class FilmsService {
  constructor(
    private readonly filmRepository: FilmRepository,
    private readonly resultRepository: ResultRepository,
  ) {}

  async create (directorId: string, payload: CreateFilmDto) {
  const filmCreatable = { ...payload, directorId };
  const film = this.filmRepository.createNew(filmCreatable);
  return this.filmRepository.save(film);  
  }

  getAll() {
    return this.filmRepository.getAll();
  }

  async getById(id: string ){
    const film = await this.filmRepository.getById(id);
    if (!film) throw new NotFoundException('Film not found');
    return film;
  }

  async getAllByDirectorId(directorId: string) {
    return this.filmRepository.getAllByDirectorId(directorId);
  }


  async update(id: string, payload: UpdateFilmDto) {
    const film = await this.filmRepository.getById(id);
    if (!film) throw new NotFoundException('Film not found');
    const filmUpdatable = { ...payload };
    return this.filmRepository.save({ ...film, ...filmUpdatable });
  }

  async deleteById(id: string) {
    const filmDeletable = await this.filmRepository.getById(id);
    if (!filmDeletable) throw new NotFoundException('Film not found');

    await this.filmRepository.deleteById(id);

    await this.resultRepository.update({ filmId: id }, { filmId: null });

    return filmDeletable;
  }

}




