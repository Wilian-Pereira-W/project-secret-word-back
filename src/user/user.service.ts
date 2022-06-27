import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(CreateUserDto: CreateUserDto) {
    const { nick, password, email } = CreateUserDto;

    const emailExists = await this.prisma.user.findMany({
      where: {
        email,
      },
    });
    if (emailExists.length !== 0) return 'Esse email já existe';

    const nickExists = await this.prisma.user.findMany({
      where: {
        nick,
      },
    });

    if (nickExists.length !== 0) return 'Esse nick já existe';

    if (emailExists.length === 0 && nickExists.length === 0) {
      const data = {
        ...CreateUserDto,
        password: await bcrypt.hash(password, 10),
      };
      const createdUser = await this.prisma.user.create({ data });
      return {
        ...createdUser,
        password: undefined,
      };
    }
  }

  findAll() {
    const users = this.prisma.user.findMany();
    return users;
  }

  async findAllRanking() {
    const users = await this.prisma.user.findMany({
      select: {
        name: true,
        nick: true,
        id: true,
        scores: {
          orderBy: {
            score: 'desc',
          },
          select: {
            difficulty: true,
            score: true,
          },
        },
      },
    });
    return users;
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
