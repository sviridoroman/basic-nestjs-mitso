import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt,  IsUUID,  IsOptional} from 'class-validator';

export class ResponseFilmDto {
  @ApiProperty()
  @IsUUID(4)
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsInt()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  genre: string;

  @ApiProperty()
  @IsInt()
  year: number;

  @ApiProperty()
  @IsOptional()
  @IsUUID(4)
  directorId: string | null;
}
