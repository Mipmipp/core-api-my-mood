import { Test, TestingModule } from '@nestjs/testing';

import { MapperService } from '@common/application/mapper/mapper.service';
import { UtilsService } from '@common/infrastructure/utils/utils.service';

import { AuthorService } from '@modules/author/application/service/author.service';

import { BookService } from '../book.service';

const mockedAuthorRepository = {
  create: jest.fn(),
  delete: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
};

const mockedBookRepository = {
  create: jest.fn(),
  delete: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
};

describe('BookService', () => {
  let service: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        { provide: 'BOOK_REPOSITORY', useValue: mockedBookRepository },
        { provide: 'AUTHOR_REPOSITORY', useValue: mockedAuthorRepository },
        UtilsService,
        AuthorService,
        MapperService,
      ],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
