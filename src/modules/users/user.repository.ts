import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  getAll() {
    return this.find();
  }

  getById(id: string) {
    return this.findOne({ id });
  }

  deleteById(id: string) {
    return this.delete({ id });
  }
}
