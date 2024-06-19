import { Book } from '@modules/book/domain/book.domain';

export interface BookRepository {
  create(book: Book): Promise<Book>;
  findAll(options: object): Promise<Book[]>;
  findById(id: number): Promise<Book>;
  update(id: number, newBook: Book): Promise<Book>;
  delete(id): Promise<void>;
}
