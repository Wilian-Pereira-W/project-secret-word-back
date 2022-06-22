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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Res() res: Response, @Body() data: CreateUserDto) {
    try {
      const user = await this.userService.create(data);
      console.log(user);

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

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get()
  findLogin(@Body() password: string, email: string) {
    return this.userService.findLogin(password, email);
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
