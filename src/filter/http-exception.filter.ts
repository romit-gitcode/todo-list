import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
interface LogResponse {
  status: number;
  timestamp: string;
  path: string;
  message: string;
}
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = exception.getStatus();
    const filePath = path.join(process.cwd(), 'storage', 'logs', 'time.json');
    const obj = {
      status: status,
      timestamp: new Date().toUTCString(),
      path: request.url,
      message: exception.getResponse(),
    };
    fs.readFile(filePath, (err, data) => {
      const array: LogResponse[] = JSON.parse(data.toString());
      array.push(obj);
      fs.writeFile(filePath, JSON.stringify(array), () => {});
    });
    if (exception instanceof HttpException) {
      if (exception instanceof BadRequestException) {
        response.status(status).json({
          status: status,
          timestamp: new Date().toUTCString(),
          path: request.url,
          message: exception.getResponse(),
        });
      } else {
        response.status(status).json({
          status: status,
          timestamp: new Date().toUTCString(),
          path: request.url,
          message: exception.message,
        });
      }
    } else {
      response.status(status).json({
        status: status,
        timestamp: new Date().toUTCString(),
        path: request.url,
        message: exception.message,
      });
    }
  }
}
