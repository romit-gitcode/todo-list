import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  title: string;

  @IsNotEmpty()
  @MaxLength(400)
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  completed: boolean;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  dueDate: Date;
}
