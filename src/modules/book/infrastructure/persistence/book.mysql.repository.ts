import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MapperService } from '@common/application/mapper/mapper.service';

import { BookRepository } from '@modules/book/application/repository/book.repository';
import { Book } from '@modules/book/domain/book.domain';
import { BookEntity } from '@modules/book/infrastructure/persistence/entities/book.entity';

@Injectable()
export class BookMysqlRepository implements BookRepository {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    private readonly mapperService: MapperService,
  ) {}

  async findAll(options?: object): Promise<Book[]> {
    const bookEntities = await this.bookRepository.find(options);
    return bookEntities.map((bookEntity) =>
      this.mapperService.entityToClass(bookEntity, new Book()),
    );
  }

  async findById(id: number): Promise<Book> {
    const bookEntity = await this.bookRepository.findOne({
      where: { id },
      relations: { author: true },
    });
    return this.mapperService.entityToClass(bookEntity, new Book());
  }

  async create(book: Book): Promise<Book> {
    const bookEntity = this.mapperService.classToEntity(book, new Book());
    const createdBookEntity = await this.bookRepository.save(bookEntity);
    return this.mapperService.entityToClass(createdBookEntity, new Book());
  }

  async update(id: number, newBook: any): Promise<Book> {
    const bookExist = await this.bookRepository.findOne({ where: { id } });
    if (!bookExist) throw new HttpException('Book no found', 404);

    this.bookRepository.merge(bookExist, newBook);
    const bookEntity = await this.bookRepository.save(bookExist);
    return this.mapperService.classToEntity(bookEntity, new Book());
  }

  async delete(id: number): Promise<void> {
    const bookExist = await this.bookRepository.findOne({ where: { id } });
    if (!bookExist) throw new HttpException('Book no found', 404);

    await this.bookRepository.delete(id);
  }
}
