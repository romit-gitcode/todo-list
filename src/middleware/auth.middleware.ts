import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let authorization: any;
    if ((authorization = req.headers['authorization'])) {
      let basic = authorization.split(' ');
      // console.log(basic);
      if (basic) {
        basic = basic[1];
        basic = Buffer.from(basic, 'base64').toString('utf8');
        // console.log(basic.split(':')[0].split('@')[0]);
        const name = basic.split(':')[0].split('@')[0];
        if (basic == `${name}@palminfotech:Palm@${name}2023`) {
          req['user'] = name;
          return next();
        }
      }
    }
    throw new UnauthorizedException();
  }
}
