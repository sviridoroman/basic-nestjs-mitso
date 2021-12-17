import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException } from '@nestjs/common';

import { UserRepository } from './user.repository';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.getAll();
  }

  async findOne(id: string) {
    const user = await this.userRepository.getById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.getById(id);
    if (!user) throw new NotFoundException('User not found');

    const userUpdatable = updateUserDto;
    if (updateUserDto.password) {
      userUpdatable.password = bcrypt.hashSync(updateUserDto.password, 10);
    }

    return this.userRepository.save({ ...user, ...userUpdatable });
  }

  async remove(id: string) {
    const userDeletable = await this.userRepository.getById(id);
    if (!userDeletable) throw new NotFoundException('User not found');

    await this.userRepository.deleteById(id);

    return userDeletable;
  }
}
