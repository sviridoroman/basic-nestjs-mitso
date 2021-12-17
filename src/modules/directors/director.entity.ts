import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ResponseDirectorDto } from './dto/response-director.dto';


@Entity({ name: 'directors' })
export class Director {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar')
  name: string = 'name';

  @Column('varchar')
  surname: string= 'surname';

  @Column('varchar')
  country: string= 'country';

  @Column('varchar')
  birthday: string= '2000';

  static toResponse(director: ResponseDirectorDto) {
    return director;
  }
}