import { Prisma } from '@prisma/client';

export class CreateScoreDto implements Prisma.ScoreCreateInput {
  user: Prisma.UserCreateNestedOneWithoutScoresInput;
  author: Prisma.UserCreateNestedOneWithoutScoresInput;
  score: number;
  difficulty: string;
}
