import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID,  IsOptional } from 'class-validator';

export class ResponseResultDto {
  @ApiProperty()
  @IsUUID(4)
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  proceeds: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  views: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID(4)
  filmId: string | null;
}
