import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ResponseFilmDto } from './dto/response-film.dto';

@Entity({ name: 'films' })
export class Film {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar')
  title: string = 'title';

  @Column('integer')
  price: number = 0;

  @Column('varchar')
  genre: string= 'genre';

  @Column('integer')
  year: number = 2000;

  @Column('varchar', { length: 36, nullable: true })
  directorId!: string | null;

  static toResponse(film: ResponseFilmDto) {
    return film;
  }
}