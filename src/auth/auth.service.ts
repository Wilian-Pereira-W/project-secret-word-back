import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: User): UserToken {
    const payload: UserPayload = {
      sub: user.id,
      name: user.name,
      role: user.role,
      nick: user.nick,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      sub: user.id,
      name: user.name,
      role: user.role,
      nick: user.nick,
      access_token: jwtToken,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValide = await bcrypt.compare(password, user.password);

      if (isPasswordValide) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new Error('Email ou Senha inválido. Tente novamente.');
  }
}
