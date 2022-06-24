import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class LoginRequestBody {
  @IsEmail(
    {},
    {
      message: 'Email ou Senha inválida. Tente novamente.',
    },
  )
  email: string;

  @IsString({
    message: 'Email ou Senha inválida. Tente novamente.',
  })
  @MinLength(8, { message: 'Email ou Senha inválida. Tente novamente.' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message: 'Email ou Senha inválida. Tente novamente.',
  })
  password: string;
}
