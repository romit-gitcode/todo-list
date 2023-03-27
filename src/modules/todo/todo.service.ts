import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthService } from '../auth/auth.service';
import { FileService } from 'src/shared/file.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TodoService {
  constructor(private fileService: FileService) {}
  private file = path.join(process.cwd(), 'storage', 'romit', 'store.json');

  async pushTask(createTodoDto: CreateTodoDto) {
    const todo = await this.fileService.readFile(this.file);
    todo.push(createTodoDto);
    this.fileService.writeFile(this.file, JSON.stringify(todo));
    return createTodoDto;
    // return 'This action adds a new todo';
  }

  async findAll() {
    const todo = await this.fileService.readFile(this.file);
    return todo;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
