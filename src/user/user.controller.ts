import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
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

  @Get('user')
  async findAll(@Res() res: Response) {
    const users = await this.userService.findAll();
    if (users.length === 0) {
      return res.status(400).json({ message: 'Não tem usuário' });
    }
    return res.status(200).json(users);
  }
  @IsPublic()
  @Get('user/ranking')
  async findAllRanking(@Res() res: Response) {
    try {
      const usersRanking = await this.userService.findAllRanking();
      if (!usersRanking) {
        return res.status(400).json({ message: 'Não tem Ranking' });
      }

      return res.status(200).json(usersRanking);
    } catch (error) {
      console.log(error);
    }
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
