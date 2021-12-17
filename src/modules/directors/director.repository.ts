import { EntityRepository, Repository } from 'typeorm';
import { Director } from './director.entity';
import { UpdateDirectorDto } from './dto/update-director.dto';

@EntityRepository(Director)
export class DirectorRepository extends Repository<Director> {
  createNew(director: Omit<Director, 'id'>) {
    return this.create(director);
  }

  getAll() {
    return this.find();
  }

  getById(id: string) {
    return this.findOne({ id });
  }

  updatById(id: string, director: UpdateDirectorDto) {
    return this.update({ id }, director);
  }

  deleteById(id: string) {
    return this.delete({ id });
  }
}