import * as bcrypt from 'bcrypt';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { ResponseUserDto } from './dto/response-user.dto';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { default: '' })
  name = '';

  @Column('varchar', { unique: true })
  login!: string;

  @Column('varchar')
  password!: string;

  @BeforeInsert()
  generatePasswordHash() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  static toResponse({ id, login, name }: ResponseUserDto) {
    return { id, login, name };
  }
}
