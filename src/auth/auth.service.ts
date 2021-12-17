import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../modules/users/user.entity';
import { UserRepository } from '../modules/users/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string) {
    const user = await this.userRepository.findOne({ login });

    if (!user) return null;
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) return null;
    return user;
  }

  async login(user: User) {
    const payload = { userId: user.id, login: user.login };
    return {
      token: this.jwtService.sign(payload),
      user: User.toResponse(user),
    };
  }
}
