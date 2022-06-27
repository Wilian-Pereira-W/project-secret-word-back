import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';

@Injectable()
export class ScoreService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createScoreDto: CreateScoreDto) {
    console.log(createScoreDto);
    const createdScore = await this.prisma.score.create({
      data: { ...createScoreDto },
    });
    return createdScore;
  }

  findAll() {
    return `This action returns all score`;
  }

  findOne(id: number) {
    return `This action returns a #${id} score`;
  }

  update(id: number, updateScoreDto: UpdateScoreDto) {
    return `This action updates a #${id} score`;
  }

  remove(id: number) {
    return `This action removes a #${id} score`;
  }
}
