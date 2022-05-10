import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
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
  getByAuthor(@Param() author: string): Book[] {
    return this.bookService.getByAuthor(author);
  }
  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number): Book[] {
    return this.bookService.getById(id);
  }
  @Post('create')
  createBook(@Body() book: Book) {
    this.bookService.createBook(book);
  }
  @Patch('modify/:id')
  modifyBook(@Param('id', ParseIntPipe) id: number, @Body() book: Book) {
    this.bookService.modifyBook(id, book);
  }
  @Delete('delete/:id')
  deleteBook(@Param('id', ParseIntPipe) id: number) {
    this.bookService.deleteBook(id);
  }
}
