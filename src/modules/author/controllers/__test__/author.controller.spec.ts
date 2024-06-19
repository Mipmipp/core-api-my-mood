import { Test, TestingModule } from '@nestjs/testing';

import { MapperService } from '@common/application/mapper/mapper.service';
import { UtilsService } from '@common/infrastructure/utils/utils.service';

import { AuthorService } from '../../application/service/author.service';
import { AuthorController } from '../author.controller';

const mockedAuthorRepository = {
  create: jest.fn(),
  delete: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
};

describe('AuthorController', () => {
  let controller: AuthorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorController],
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

    controller = module.get<AuthorController>(AuthorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
