import { HttpException, Inject, Injectable } from '@nestjs/common';

import { MapperService } from '@common/application/mapper/mapper.service';
import { UtilsService } from '@common/infrastructure/utils/utils.service';

import { AuthorRepository } from '@modules/author/application/repository/author.repository';
import { CreateAuthorDto } from '@modules/author/controllers/dto/create-author.dto';
import { UpdateAuthorDto } from '@modules/author/controllers/dto/update-author.dto';
import { Author } from '@modules/author/domain/author.domain';

@Injectable()
export class AuthorService {
  constructor(
    @Inject('AUTHOR_REPOSITORY')
    private readonly authorRepository: AuthorRepository,
    private readonly mapperService: MapperService,
    private readonly utilsService: UtilsService,
  ) {}
  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    try {
      const author: Author = this.mapperService.dtoToClass(
        createAuthorDto,
        new Author(),
      );

      const response: Author = await this.authorRepository.create(author);
      return this.utilsService.removePropertiesFromObject(response, [
        'password',
      ]);
    } catch (error) {
      throw new HttpException(error.message, 404);
    }
  }

  async findAll(): Promise<Author[]> {
    try {
      const response = await this.authorRepository.findAll();
      return response.map((item) =>
        this.utilsService.removePropertiesFromObject(item, ['password']),
      );
    } catch (error) {
      throw new HttpException(error.message, 404);
    }
  }

  async findOne(id: number): Promise<Author> {
    try {
      const response = await this.authorRepository.findById(id);
      return this.utilsService.removePropertiesFromObject(response, [
        'password',
      ]);
    } catch (error) {
      throw new HttpException(error.message, 404);
    }
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    try {
      const updateAuthor = this.mapperService.dtoToClass(
        updateAuthorDto,
        new Author(),
      );
      const response = await this.authorRepository.update(id, updateAuthor);
      return this.utilsService.removePropertiesFromObject(response, [
        'password',
      ]);
    } catch (error) {
      throw new HttpException(error.message, 404);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      return await this.authorRepository.delete(id);
    } catch (error) {
      throw new HttpException(error.message, 404);
    }
  }
}
