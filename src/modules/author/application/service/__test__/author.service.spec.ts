import { Test, TestingModule } from '@nestjs/testing';

import { MapperService } from '@common/application/mapper/mapper.service';
import { UtilsService } from '@common/infrastructure/utils/utils.service';

import { AuthorService } from '../author.service';

const mockedAuthorRepository = {
  create: jest.fn(),
  delete: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
};

describe('AuthorService', () => {
  let service: AuthorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorService,
        {
          provide: 'AUTHOR_REPOSITORY',
          useValue: mockedAuthorRepository,
        },
        MapperService,
        UtilsService,
      ],
    }).compile();

    service = module.get<AuthorService>(AuthorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
