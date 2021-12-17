import { getCustomRepository } from 'typeorm';
import { define } from 'typeorm-seeding';
import { User } from '../../modules/users/user.entity';
import { UserRepository } from '../../modules/users/user.repository';

define(User, () => {
  const user = {
    name: 'admin',
    login: 'admin',
    password: 'admin',
  } as Omit<User, 'id'>;

  const userRepository = getCustomRepository(UserRepository);
  return userRepository.create(user);
});
