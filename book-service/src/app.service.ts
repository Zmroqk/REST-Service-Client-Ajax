import { Injectable, NotFoundException } from '@nestjs/common';
import Book from './book';

@Injectable()
export class BookService {
   books: Book[] = []

   getAll(): Book[] {
      return this.books;
   }
   getById(id: number): Book[] {
      return this.books.filter((b) => b.id == id);
   }
   getByAuthor(author: string): Book[] {
      return this.books.filter((b) => b.author == author);
   }
   createBook(book: Book) {
      if (this.books.length > 0)
         book.id = this.books[this.books.length-1].id + 1;
      else
         book.id = 1;
      this.books.push(book);
   }
   modifyBook(id: number, book: Book) {
      const selectedBook = this.books.find((b) => b.id == id);
      if (!selectedBook) {
         throw new NotFoundException(id)
      }
      Object.assign(selectedBook, book);
   }
   deleteBook(id: number) {
      const index = this.books.findIndex((b) => b.id == id);
      if (index == -1) {
         throw new NotFoundException(index);
      }
      this.books.splice(index, 1);
   }
}
