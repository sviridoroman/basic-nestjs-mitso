import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ResponseResultDto } from './dto/response-result.dto';

@Entity({ name: 'results' })
export class Result {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar')
  country: string = 'country';

  @Column('varchar')
  proceeds: string = '0';

  @Column('varchar')
  views: string= '0';

  @Column('varchar', { length: 36, nullable: true })
  filmId!: string | null;

  static toResponse(result: ResponseResultDto) {
    return result;
  }
}