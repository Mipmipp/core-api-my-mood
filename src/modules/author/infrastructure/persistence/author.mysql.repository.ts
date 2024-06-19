import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MapperService } from '@common/application/mapper/mapper.service';

import { AuthorRepository } from '@modules/author/application/repository/author.repository';
import { Author } from '@modules/author/domain/author.domain';
import { AuthorEntity } from '@modules/author/infrastructure/persistence/entities/author.entity';

@Injectable()
export class AuthorMysqlRepository implements AuthorRepository {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
    private readonly mapperService: MapperService,
  ) {}

  async findAll(options?: object): Promise<Author[]> {
    const authorEntities = await this.authorRepository.find(options);
    return authorEntities.map((authorEntity) =>
      this.mapperService.entityToClass(authorEntity, new Author()),
    );
  }

  async findById(id: number): Promise<Author> {
    const authorEntity = await this.authorRepository.findOne({ where: { id } });
    return this.mapperService.entityToClass(authorEntity, new Author());
  }

  async create(author: Author): Promise<Author> {
    const authorEntity = this.mapperService.classToEntity(
      author,
      new AuthorEntity(),
    );
    const createdAuthorEntity = await this.authorRepository.save(authorEntity);
    return this.mapperService.entityToClass(createdAuthorEntity, new Author());
  }

  async update(id: number, newAuthor: Author): Promise<Author> {
    const authorExist = await this.authorRepository.findOne({ where: { id } });
    if (!authorExist) throw new HttpException('Author no found', 404);

    this.authorRepository.merge(authorExist, newAuthor);
    const authorEntity = await this.authorRepository.save(authorExist);

    return this.mapperService.entityToClass(authorEntity, new Author());
  }

  async delete(id: number): Promise<void> {
    const authorExist = await this.authorRepository.findOne({ where: { id } });
    if (!authorExist) throw new HttpException('Author no found', 404);

    await this.authorRepository.delete(id);
  }
}
