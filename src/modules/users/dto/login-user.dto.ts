import { ApiProperty } from '@nestjs/swagger';
import {  IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ minimum: 6 })
  @MinLength(6)
  password: string;
}
