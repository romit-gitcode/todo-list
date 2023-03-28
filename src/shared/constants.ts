import { MetaDto } from './dto/meta.dto';

export interface ResponseData<T> {
  data: T;
  message: string;
  meta?: MetaDto;
}
