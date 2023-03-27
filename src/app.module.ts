import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { TodoModule } from './modules/todo/todo.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [AuthModule, TodoModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
