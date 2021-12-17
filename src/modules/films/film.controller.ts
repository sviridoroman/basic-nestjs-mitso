import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode, UseGuards, HttpStatus } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';

import {Film} from './film.entity';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { ResponseFilmDto } from './dto/response-film.dto';
import { FilmsService } from './film.service';

@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
@ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The found record',
    type: ResponseFilmDto,
  })
  @ApiOperation({ summary: 'Created' })
  @HttpCode(HttpStatus.CREATED)
  @Post('/:directorId/films')
  async create(
    @Param('directorId') directorId: string,
    @Body() createFilmDto: CreateFilmDto) {
    const film = await this.filmsService.create(directorId,createFilmDto);
    return Film.toResponse(film);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All films',
    type: [ResponseFilmDto],
  })
  @ApiOperation({ summary: 'List of films' })
  @Get()
  async getAll() {
    const films = await this.filmsService.getAll();
    return films.map(Film.toResponse);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Film founded',
    type: ResponseFilmDto,
  })
  @ApiOperation({ summary: 'Find film' })
  @Get(':id')
  async getById(@Param('id') id: string) {
    const film = await this.filmsService.getById(id);
    return Film.toResponse(film);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Film updated',
    type: ResponseFilmDto,
  })
  @ApiOperation({ summary: 'Update film' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFilmDto: UpdateFilmDto,
  ) {
    const film = await this.filmsService.update(id, updateFilmDto);
    return Film.toResponse(film);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The deleted film',
    type: ResponseFilmDto,
  })
  @ApiOperation({ summary: 'Delete director' })
  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    const film = await this.filmsService.deleteById(id);
    return Film.toResponse(film);
  }
}