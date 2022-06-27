import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { IsPublic } from '../auth/decorators/is-public.decorator';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post('user/register')
  async create(@Res() res: Response, @Body() data: CreateUserDto) {
    try {
      const user = await this.userService.create(data);

      if (user === 'Esse email já existe') {
        return res.status(409).json({ message: 'Esse email já existe' });
      }

      if (user === 'Esse nick já existe') {
        return res.status(409).json({ message: 'Esse nick já existe' });
      }

      if (user) {
        return res.status(200).json(user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  @IsPublic()
  @Get('user')
  async findAll(@Res() res: Response) {
    const users = await this.userService.findAll();
    if (users.length === 0) {
      return res.status(400).json({ message: 'Não tem usuário' });
    }
    return res.status(200).json(users);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
