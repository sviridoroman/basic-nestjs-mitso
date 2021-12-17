import { EntityRepository, Repository } from 'typeorm';
import {Film} from './film.entity';
import { UpdateFilmDto } from './dto/update-film.dto';

@EntityRepository(Film)
export class FilmRepository extends Repository<Film> {

  createNew(film: Omit<Film, 'id'>) {
    return this.create(film);
  }

  getAll() {
    return this.find();
  }

  getById(id: string) {
    return this.findOne({ id });
  }

  getAllByDirectorId(directorId: string) {
    return this.find({ directorId });
  }

  updatById(id: string, film: UpdateFilmDto) {
    return this.update({ id }, film);
  }

  deleteById(id: string) {
    return this.delete({ id });
  }
}