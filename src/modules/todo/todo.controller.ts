import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ResponseData } from 'src/shared/constants';
import { PaginationDto } from '../../shared/dto/pagination.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async pushTask(@Req() req: Request, @Body() createTodoDto: CreateTodoDto) {
    return {
      data: await this.todoService.pushTask(createTodoDto, req['user']),
      message: 'Data pushed successfully',
    };
  }

  @Get()
  async findAll(
    @Req() req: Request,
    @Query() page: PaginationDto,
  ): Promise<ResponseData<any>> {
    // console.log(req['user']);
    const data = await this.todoService.findAll(page, req['user']);
    return {
      data: data.pagetodo,
      message: 'Successfull',
      meta: data.meta,
    };
  }

  @Get(':id')
  async findOne(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<ResponseData<any>> {
    return {
      data: await this.todoService.findOne(+id, req['user']),
      message: 'Successfull',
    };
  }

  @Patch(':id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() data: UpdateTodoDto,
  ): Promise<ResponseData<any>> {
    return {
      data: await this.todoService.update(+id, data, req['user']),
      message: 'Updated Successfull',
    };
  }

  @Delete(':id')
  async remove(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<ResponseData<any>> {
    return {
      data: await this.todoService.remove(+id, req['user']),
      message: 'Successfull',
    };
  }
}
