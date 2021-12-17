import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode, UseGuards, HttpStatus } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';

import {Director} from './director.entity';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { ResponseDirectorDto } from './dto/response-director.dto';
import { DirectorsService } from './director.service';

@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
@ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('directors')
export class DirectorsController {
  constructor(private readonly directorsService: DirectorsService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The found record',
    type: ResponseDirectorDto,
  })
  @ApiOperation({ summary: 'Created' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createDirectorDto: CreateDirectorDto) {
    const director = await this.directorsService.create(createDirectorDto);
    return Director.toResponse(director);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All directors',
    type: [ResponseDirectorDto],
  })
  @ApiOperation({ summary: 'List of directors' })
  @Get()
  async getAll() {
    const directors = await this.directorsService.getAll();
    return directors.map(Director.toResponse);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Director founded',
    type: ResponseDirectorDto,
  })
  @ApiOperation({ summary: 'Find director' })
  @Get(':id')
  async getById(@Param('id') id: string) {
    const director = await this.directorsService.getById(id);
    return Director.toResponse(director);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Director updated',
    type: ResponseDirectorDto,
  })
  @ApiOperation({ summary: 'Update director' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDirectorDto: UpdateDirectorDto,
  ) {
    const director = await this.directorsService.update(id, updateDirectorDto);
    return Director.toResponse(director);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The deleted director',
    type: ResponseDirectorDto,
  })
  @ApiOperation({ summary: 'Delete director' })
  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    const director = await this.directorsService.deleteById(id);
    return Director.toResponse(director);
  }
}