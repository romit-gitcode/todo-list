import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseData } from '../shared/constants';

export interface Response<T> {
  status: number;
  message: string;
  data: Omit<ResponseData<T>, 'message'>;
}
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<any>> {
    const status = context.switchToHttp().getResponse().statusCode;
    return next.handle().pipe(
      map((data) => {
        if (!data['meta']) {
          return {
            status: status,
            message: data.message,
            data: data.data,
          };
        } else {
          return {
            status: status,
            message: data.message,
            data: data.data,
            meta: data.meta,
          };
        }
      }),
    );
  }
}
