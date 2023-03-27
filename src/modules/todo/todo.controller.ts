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
  async findOne(@Param('id') id: string): Promise<ResponseData<any>> {
    return {
      data: await this.todoService.findOne(+id),
      message: 'Successfull',
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateTodoDto,
  ): Promise<ResponseData<any>> {
    return {
      data: await this.todoService.update(+id, data),
      message: 'Deleted Successfull',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ResponseData<any>> {
    return {
      data: await this.todoService.remove(+id),
      message: 'Successfull',
    };
  }
}
