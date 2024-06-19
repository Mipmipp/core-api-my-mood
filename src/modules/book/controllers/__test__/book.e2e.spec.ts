import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { join } from 'path';
import * as request from 'supertest';

import { loadFixtures } from '@data/util/loader';

import { AppModule } from '@/app.module';
import { Status } from '@/modules/author/domain/status.enum';

import { Format } from '../../domain/format.enum';

describe('Book - [/book]', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    await loadFixtures(
      `${__dirname}/fixture`,
      join(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'configuration/orm.configuration.ts',
      ),
    );

    app = moduleRef.createNestApplication();

    await app.init();
  });

  describe('Get all - [GET /book]', () => {
    it('should return an array of books', async () => {
      return request(app.getHttpServer())
        .get('/book')
        .expect(HttpStatus.OK)
        .then(({ body }) => {
          const expectedBooks = expect.arrayContaining([
            expect.objectContaining({
              id: 1,
              title: 'Title one',
              format: Format.DIGITAL,
              author: expect.objectContaining({
                id: 1,
                firstName: 'John',
                lastName: 'Doe',
                status: Status.ACTIVE,
              }),
            }),
            expect.objectContaining({
              id: 2,
              title: 'Title two',
              format: Format.DIGITAL,
              author: expect.objectContaining({
                id: 2,
                firstName: 'Jane',
                lastName: 'Doe',
                status: Status.ACTIVE,
              }),
            }),
          ]);

          expect(body).toEqual(expectedBooks);
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
