import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode, UseGuards, HttpStatus } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';

import {Result} from './result.entity';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { ResponseResultDto } from './dto/response-result.dto';
import { ResultsService } from './result.service';

@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
@ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('results')
export class ResultssController {
  constructor(private readonly resultsService: ResultsService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The found record',
    type: ResponseResultDto,
  })
  @ApiOperation({ summary: 'Created' })
  @HttpCode(HttpStatus.CREATED)
  @Post('/:filmId/result')
  async create(
    @Param('filmID') filmID: string,
    @Body() createResultDto: CreateResultDto) {
    const result = await this.resultsService.create(filmID ,createResultDto);
    return Result.toResponse(result);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All results',
    type: [ResponseResultDto],
  })
  @ApiOperation({ summary: 'List of results' })
  @Get()
  async getAll() {
    const results = await this.resultsService.getAll();
    return results.map(Result.toResponse);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Results founded',
    type: ResponseResultDto,
  })
  @ApiOperation({ summary: 'Find result' })
  @Get(':id')
  async getById(@Param('id') id: string) {
    const result = await this.resultsService.getById(id);
    return Result.toResponse(result);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Result updated',
    type: ResponseResultDto,
  })
  @ApiOperation({ summary: 'Update result' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateResultDto: UpdateResultDto,
  ) {
    const result = await this.resultsService.update(id, updateResultDto);
    return Result.toResponse(result);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The deleted result',
    type: ResponseResultDto,
  })
  @ApiOperation({ summary: 'Delete result' })
  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    const result = await this.resultsService.deleteById(id);
    return Result.toResponse(result);
  }

 /* @ApiResponse({
    status: HttpStatus.OK,
    description: 'All results',
    type: ResponseResultDto,
  })
  @ApiOperation({ summary: 'List of results' })
  @Get(':id')
  async getAllByFilmId(
    @Param('boardId') boardId: string,
    @Param('id') taskId: string,
  ) {
    const task = await this.resultsService.getAllByFilmId(
      boardId,
      taskId,
    );
    return Task.toResponse(task);
  }
*/





}