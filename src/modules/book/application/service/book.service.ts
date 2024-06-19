import { HttpException, Inject, Injectable } from '@nestjs/common';

import { MapperService } from '@common/application/mapper/mapper.service';

import { AuthorService } from '@modules/author/application/service/author.service';
import { BookRepository } from '@modules/book/application/repository/book.repository';
import { CreateBookDto } from '@modules/book/controllers/dto/create-book.dto';
import { UpdateBookDto } from '@modules/book/controllers/dto/update-book.dto';
import { Book } from '@modules/book/domain/book.domain';

@Injectable()
export class BookService {
  constructor(
    @Inject('BOOK_REPOSITORY')
    private readonly bookRepository: BookRepository,
    private readonly authorService: AuthorService,
    private readonly mapperService: MapperService,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const author = await this.authorService.findOne(createBookDto.author);
    try {
      const book = this.mapperService.dtoToClass(createBookDto, new Book());
      book.author = author;
      return await this.bookRepository.create(book);
    } catch (error) {
      throw new HttpException(error.message, 404);
    }
  }

  async findAll(): Promise<Book[]> {
    try {
      return await this.bookRepository.findAll({ relations: { author: true } });
    } catch (error) {
      throw new HttpException(error.message, 404);
    }
  }

  async findOne(id: number): Promise<Book> {
    try {
      return await this.bookRepository.findById(id);
    } catch (error) {
      throw new HttpException(error.message, 404);
    }
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    try {
      const updateBook = this.mapperService.dtoToClass(
        updateBookDto,
        new Book(),
      );
      return await this.bookRepository.update(id, updateBook);
    } catch (error) {
      throw new HttpException(error.message, 404);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      return await this.bookRepository.delete(id);
    } catch (error) {
      throw new HttpException(error.message, 404);
    }
  }
}
