import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ResponseData } from 'src/shared/constants';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async pushTask(@Body() createTodoDto: CreateTodoDto) {
    return {
      data: await this.todoService.pushTask(createTodoDto),
      message: 'Data pushed successfully',
    };
  }

  @Get()
  async findAll(): Promise<ResponseData<any>> {
    return {
      data: await this.todoService.findAll(),
      message: 'Successfull',
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
