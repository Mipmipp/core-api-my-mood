import { Author } from '@modules/author/domain/author.domain';

export interface AuthorRepository {
  create(author: Author): Promise<Author>;
  findAll(options?: object): Promise<Author[]>;
  findById(id: number): Promise<Author>;
  update(id: number, newAuthor: Author): Promise<Author>;
  delete(id): Promise<void>;
}
