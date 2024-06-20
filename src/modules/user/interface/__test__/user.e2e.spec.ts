import { HttpStatus, INestApplication } from '@nestjs/common';
import { join } from 'path';
import * as request from 'supertest';

import { loadFixtures } from '@data/util/loader';

import { userToken } from '@/tests/test.constants';
import { testModuleBootstrapper } from '@/tests/test.module.bootstrapper';

describe('User - [/user]', () => {
  let app: INestApplication;

  beforeAll(async () => {
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

    const moduleRef = await testModuleBootstrapper();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Get - [GET /user/:email]', () => {
    it('should return a user', async () => {
      return request(app.getHttpServer())
        .get('/user/john.doe@test.com')
        .auth(userToken, { type: 'bearer' })
        .expect(HttpStatus.OK)
        .then(({ body }) => {
          const expectedUser = expect.objectContaining({
            username: 'john',
            email: 'john.doe@test.com',
          });

          expect(body).toEqual(expectedUser);
        });
    });

    it('should not return a user if it does not exist', async () => {
      return request(app.getHttpServer())
        .get('/user/not.john.doe@test.com')
        .auth(userToken, { type: 'bearer' })
        .expect(HttpStatus.NOT_FOUND);
    });

    it('should not return a user with a foreign email', async () => {
      return request(app.getHttpServer())
        .get('/user/jane.doe@test.com')
        .auth(userToken, { type: 'bearer' })
        .expect(HttpStatus.FORBIDDEN)
        .then(({ body }) => {
          const expectedResponse = expect.objectContaining({
            message: 'Users cannot manage foreign users.',
          });

          expect(body).toEqual(expectedResponse);
        });
    });
  });

  describe('Patch - [PATCH /user/:email]', () => {
    it('should update a user', async () => {
      return request(app.getHttpServer())
        .patch('/user/john.doe@test.com')
        .auth(userToken, { type: 'bearer' })
        .send({
          username: 'johnp',
        })
        .expect(HttpStatus.OK)
        .then(({ body }) => {
          const expectedUser = expect.objectContaining({
            username: 'johnp',
            email: 'john.doe@test.com',
          });

          expect(body).toEqual(expectedUser);
        });
    });

    it('should not update a user if it does not exist', async () => {
      return request(app.getHttpServer())
        .patch('/user/not.john.doe@test.com')
        .auth(userToken, { type: 'bearer' })
        .send({
          username: 'johnp',
        })
        .expect(HttpStatus.NOT_FOUND);
    });

    it('should not update a user with a foreign email', async () => {
      return request(app.getHttpServer())
        .patch('/user/jane.doe@test.com')
        .auth(userToken, { type: 'bearer' })
        .send({
          username: 'johnp',
        })
        .expect(HttpStatus.FORBIDDEN)
        .then(({ body }) => {
          const expectedResponse = expect.objectContaining({
            message: 'Users cannot manage foreign users.',
          });

          expect(body).toEqual(expectedResponse);
        });
    });
  });
});
