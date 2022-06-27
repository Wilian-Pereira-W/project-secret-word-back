import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class RegisterRequestBody {
  @IsEmail(
    {},
    {
      message: 'Formato do email é inválido! Ex: test@test.com',
    },
  )
  email: string;

  @MinLength(8, { message: 'A senha deve ser maior ou igual a 8 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      'A senha deve ser composta de letra Maiúscula, letra minúscula, caractere especial e número',
  })
  password: string;

  @MinLength(1, { message: 'O nome deve ser maior ou igual a 1 caractere' })
  @IsString()
  name: string;

  @MinLength(1, { message: 'O nick deve ser maior ou igual a 1 caractere' })
  nick: string;
}
