import { IsNotEmpty } from 'class-validator';

export class JwtPayloadDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  login: string;
}
