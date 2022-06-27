import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
} from '@nestjs/common';
import { ScoreService } from './score.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@UseGuards(AuthGuard('jwt'))
@Controller()
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post('score')
  create(@Res() res: Response, @Body() createScoreDto: CreateScoreDto) {
    try {
      const score = this.scoreService.create(createScoreDto);
      if (score) {
        return res.status(200).json(score);
      }
    } catch (error) {
      console.log(error);
    }
  }

  @Get()
  findAll() {
    return this.scoreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scoreService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScoreDto: UpdateScoreDto) {
    return this.scoreService.update(+id, updateScoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scoreService.remove(+id);
  }
}
