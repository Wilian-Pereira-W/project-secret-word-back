import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { RegisterRequestBody } from '../models/RegisterRequestBody';
import { validate } from 'class-validator';

@Injectable()
export class RegisterValidationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    const registerRequestBody = new RegisterRequestBody();
    registerRequestBody.email = body.email;
    registerRequestBody.password = body.password;
    registerRequestBody.name = body.name;
    registerRequestBody.nick = body.nick;

    const validations = await validate(registerRequestBody);

    if (validations.length) {
      throw new BadRequestException(
        validations.reduce((acc, curr) => {
          return [...acc, ...Object.values(curr.constraints)];
        }, []),
      );
    }

    next();
  }
}
