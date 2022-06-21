import { Prisma, Role } from '@prisma/client';

export class CreateUserDto implements Prisma.UserCreateInput {
  email: string;
  name: string;
  password: string;
  nick: string;
  role?: Role;
  scores?: Prisma.ScoreCreateNestedManyWithoutUserInput;
}
