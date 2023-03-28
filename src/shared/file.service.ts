import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';

@Injectable()
export class FileService {
  readFile = async (path: string) => {
    try {
      const file = await fs.open(path, 'r');
      const data = JSON.parse((await file.readFile()).toString())['tasks'];
      file.close();
      return data;
    } catch (error) {
      throw error;
    }
  };

  writeFile = async (path: string, content: any) => {
    try {
      const file = await fs.open(path, 'w');
      await file.writeFile(content).then(() => {
        console.log('File content updated');
      });
      file.close();
    } catch (error) {
      throw error;
    }
  };

  makeDirectory = async (path: string) => {
    try {
      await fs.mkdir(path);
      await fs.writeFile(path + '/store.json', JSON.stringify({ tasks: [] }));
    } catch (error) {
      throw error;
    }
  };
}
