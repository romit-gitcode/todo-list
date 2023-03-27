import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { SharedModule } from 'src/shared/shared.module';
import { LoggerMiddleware } from '../../middleware/logger.middleware';

@Module({
  imports: [SharedModule],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(
      {
        path: 'todo',
        method: RequestMethod.POST,
      },
      { path: 'todo/:id', method: RequestMethod.DELETE },
    );
  }
}
