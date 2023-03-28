import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class ResponseTimeInterceptor implements NestInterceptor {
  public FILE_PATH = path.join(process.cwd(), 'storage', 'logs', 'time.json');
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const requestTime = Date.now();

    return next.handle().pipe(
      tap(async () => {
        const responseTime = Date.now();
        const apiTime = responseTime - requestTime;
        const log = {
          url: request.originalUrl,
          requestTime: new Date(requestTime).toISOString(),
          responseTime: new Date(responseTime).toISOString(),
          apiTime: apiTime,
          name: 'Romit',
        };
        const logs = JSON.parse(await fs.readFile(this.FILE_PATH, 'utf-8'));
        logs.push(log);
        fs.writeFile(this.FILE_PATH, JSON.stringify(logs));
      }),
    );
  }
}
