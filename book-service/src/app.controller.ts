import { Controller, Get, Query } from '@nestjs/common';
import { BookService } from './app.service';
import Book from './book';

@Controller()
export class AppController {
  constructor(private readonly bookService: BookService) { }

  @Get('all')
  getAll(): Book[] {
    return this.bookService.getAll();
  }
  @Get('author/:author')
  getByAuthor(@Query() author: string): Book[] {
    return this.bookService.getByAuthor(author);
  }
  @Get(':id')
  getById(@Query() id: number): Book[] {
    return this.bookService.getById(id);
  }
  
}
