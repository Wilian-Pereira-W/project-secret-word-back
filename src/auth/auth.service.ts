import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
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
