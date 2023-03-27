import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let authorization;
    if ((authorization = req.headers['authorization'])) {
      let basic = authorization.split(' ');
      console.log(basic);
      if (basic) {
        basic = basic[1];
        basic = Buffer.from(basic, 'base64').toString('utf8');
        if (basic == 'vishal:123456') {
          return next();
        }
      }
    }
    throw new UnauthorizedException();
  }
}
