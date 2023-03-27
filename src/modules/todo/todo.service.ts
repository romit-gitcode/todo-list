import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthService } from '../auth/auth.service';
import { FileService } from 'src/shared/file.service';
import * as fs from 'fs';
import * as path from 'path';
import { HttpExceptionFilter } from 'src/filter/http-exception.filter';

@Injectable()
export class TodoService {
  constructor(private fileService: FileService) {}
  private file = path.join(process.cwd(), 'storage', 'romit', 'store.json');

  async pushTask(createTodoDto: CreateTodoDto) {
    try {
      const todo = await this.fileService.readFile(this.file);
      todo.push(createTodoDto);
      const object = { tasks: todo };
      this.fileService.writeFile(this.file, JSON.stringify(object));
      return createTodoDto;
    } catch (err) {
      throw err;
    }
  }

  async findAll() {
    try {
      const todo = await this.fileService.readFile(this.file);
      return todo;
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: number) {
    try {
      const todo = await this.fileService.readFile(this.file);
      const task = todo.find((taskTodo: any) => {
        return taskTodo.id === id;
      });
      return task;
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, data: UpdateTodoDto) {
    try {
      const todo = await this.fileService.readFile(this.file);
      const index = todo.findIndex((taskTodo: any) => {
        return taskTodo.id === id;
      });
      const updateTask = { ...todo[index], ...data, id: id };
      if (index != -1) {
        todo[index] = updateTask;
        const object = { tasks: todo };
        this.fileService.writeFile(this.file, JSON.stringify(object));
      } else {
        throw new NotFoundException();
      }
    } catch (err) {
      throw err;
    }
  }

  async remove(id: number) {
    try {
      const todo = await this.fileService.readFile(this.file);
      const index = todo.findIndex((taskTodo: any) => {
        return taskTodo.id === id;
      });
      if (index != -1) {
        const deletedTask = todo[index];
        todo.splice(index, 1);
        const object = { tasks: todo };
        this.fileService.writeFile(this.file, JSON.stringify(object));
        return deletedTask;
      } else {
        throw new NotFoundException();
      }
    } catch (err) {
      throw err;
    }
  }
}
