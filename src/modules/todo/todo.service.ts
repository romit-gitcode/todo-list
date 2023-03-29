import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthService } from '../auth/auth.service';
import { FileService } from 'src/shared/file.service';
import * as fs from 'fs/promises';
import * as path from 'path';
import { HttpExceptionFilter } from 'src/filter/http-exception.filter';
import { MetaDto } from '../../shared/dto/meta.dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

@Injectable()
export class TodoService {
  constructor(private fileService: FileService) {}
  private file = path.join(process.cwd(), 'storage', 'romit', 'store.json');

  async pushTask(createTodoDto: CreateTodoDto, username: string) {
    try {
      await fs.access(path.join(process.cwd(), 'storage', username));
    } catch (error) {
      await this.fileService.makeDirectory(
        path.join(process.cwd(), 'storage', username),
      );
    }
    try {
      const file = path.join(process.cwd(), 'storage', username, 'store.json');
      const todo = await this.fileService.readFile(file);
      todo.push(createTodoDto);
      const object = { tasks: todo };
      this.fileService.writeFile(file, JSON.stringify(object));
      return createTodoDto;
    } catch (err) {
      throw err;
    }
  }

  async findAll(page: PaginationDto, username: string) {
    try {
      await fs.access(path.join(process.cwd(), 'storage', username));
    } catch (error) {
      await this.fileService.makeDirectory(
        path.join(process.cwd(), 'storage', username),
      );
    }
    try {
      const file = path.join(process.cwd(), 'storage', username, 'store.json');
      const todo = await this.fileService.readFile(file);
      const meta: MetaDto = {
        currentPage: +page.page,
        endPage: Math.ceil(todo.length / page.limit),
        pageSize: +page.limit,
        startPage: 1,
        totalItems: todo.length,
        totalPages: Math.ceil(todo.length / page.limit),
      };
      const pagetodo = todo.slice(
        meta.currentPage * meta.pageSize - meta.pageSize,
        meta.currentPage * meta.pageSize,
      );
      return { pagetodo, meta };
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: number, username: string) {
    try {
      await fs.access(path.join(process.cwd(), 'storage', username));
    } catch (error) {
      await this.fileService.makeDirectory(
        path.join(process.cwd(), 'storage', username),
      );
    }
    try {
      const file = path.join(process.cwd(), 'storage', username, 'store.json');
      const todo = await this.fileService.readFile(file);
      const task = todo.find((taskTodo: any) => {
        return taskTodo.id === id;
      });
      return task;
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, data: UpdateTodoDto, username: string) {
    try {
      await fs.access(path.join(process.cwd(), 'storage', username));
    } catch (error) {
      await this.fileService.makeDirectory(
        path.join(process.cwd(), 'storage', username),
      );
    }
    try {
      const file = path.join(process.cwd(), 'storage', username, 'store.json');
      const todo = await this.fileService.readFile(file);
      const index = todo.findIndex((taskTodo: any) => {
        return taskTodo.id === id;
      });
      const updateTask = { ...todo[index], ...data, id: id };
      if (index != -1) {
        todo[index] = updateTask;
        const object = { tasks: todo };
        this.fileService.writeFile(file, JSON.stringify(object));
      } else {
        throw new NotFoundException();
      }
    } catch (err) {
      throw err;
    }
  }

  async remove(id: number, username: string) {
    try {
      await fs.access(path.join(process.cwd(), 'storage', username));
    } catch (error) {
      await this.fileService.makeDirectory(
        path.join(process.cwd(), 'storage', username),
      );
    }
    try {
      const file = path.join(process.cwd(), 'storage', username, 'store.json');
      const todo = await this.fileService.readFile(file);
      const index = todo.findIndex((taskTodo: any) => {
        return taskTodo.id === id;
      });
      if (index != -1) {
        const deletedTask = todo[index];
        todo.splice(index, 1);
        const object = { tasks: todo };
        this.fileService.writeFile(file, JSON.stringify(object));
        return deletedTask;
      } else {
        throw new NotFoundException();
      }
    } catch (err) {
      throw err;
    }
  }
}
