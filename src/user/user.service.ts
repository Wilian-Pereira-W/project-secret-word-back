import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as md5 from 'md5';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateUserDto) {
    const { name, nick, password, email } = data;
    const encryptedPass = md5(password);

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
      const user = this.prisma.user.create({
        data: {
          name,
          email,
          password: encryptedPass,
          nick,
        },
      });
      return user;
    }
  }

  findAll() {
    const users = this.prisma.user.findMany();
    return users;
  }

  findLogin(password: string, email: string) {
    const user = this.prisma.user.findMany({
      where: {
        email,
      },
    });
    console.log(user);
    return user;
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
