import { HttpStatus, INestApplication } from '@nestjs/common';
import { join } from 'path';
import * as request from 'supertest';

import { loadFixtures } from '@data/util/loader';

import { testModuleBootstrapper } from '@/tests/test.module.bootstrapper';

import { AuthenticationCredentials } from '../dto/authenticationCredentials';
import { SignUpDto } from '../dto/sign-up.dto';

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

  describe('Sign Up - [GET /authentication/sign-up]', () => {
    it('should allow users to sign up', async () => {
      const signUpDto = {
        username: 'jake',
        email: 'jake.doe@test.com',
        password: 'Password1234!',
      } as SignUpDto;

      await request(app.getHttpServer())
        .post('/authentication/sign-up')
        .send(signUpDto)
        .expect(HttpStatus.CREATED)
        .then(({ body }) => {
          const expectedResponse = expect.objectContaining({
            access_token: expect.any(String),
          });

          expect(body).toEqual(expectedResponse);
        });
    });

    it('should not allow users to sign up with email that already exists', async () => {
      const signUpDto = {
        username: 'johnp',
        email: 'john.doe@test.com',
        password: 'Password1234!',
      } as SignUpDto;

      await request(app.getHttpServer())
        .post('/authentication/sign-up')
        .send(signUpDto)
        .expect(HttpStatus.BAD_REQUEST)
        .then(({ body }) => {
          const expectedResponse = expect.objectContaining({
            message: 'User already exists',
          });

          expect(body).toEqual(expectedResponse);
        });
    });
  });

  describe('Sign In - [GET /authentication/sign-in]', () => {
    it('should allow users to sign in', async () => {
      const authenticationCredentials = {
        email: 'jake.doe@test.com',
        password: 'Password1234!',
      } as AuthenticationCredentials;

      await request(app.getHttpServer())
        .post('/authentication/sign-in')
        .send(authenticationCredentials)
        .expect(HttpStatus.CREATED)
        .then(({ body }) => {
          const expectedResponse = expect.objectContaining({
            access_token: expect.any(String),
          });

          expect(body).toEqual(expectedResponse);
        });
    });

    it('should not allow users to sign in with wrong email', async () => {
      const authenticationCredentials = {
        email: 'not.jake.doe@test.com',
        password: 'Password1234!',
      } as AuthenticationCredentials;

      await request(app.getHttpServer())
        .post('/authentication/sign-in')
        .send(authenticationCredentials)
        .expect(HttpStatus.BAD_REQUEST)
        .then(({ body }) => {
          const expectedResponse = expect.objectContaining({
            message: 'Invalid credentials',
          });

          expect(body).toEqual(expectedResponse);
        });
    });

    it('should not allow users to sign in with wrong password', async () => {
      const authenticationCredentials = {
        email: 'jake.doe@test.com',
        password: 'notPassword1234!',
      } as AuthenticationCredentials;

      await request(app.getHttpServer())
        .post('/authentication/sign-in')
        .send(authenticationCredentials)
        .expect(HttpStatus.BAD_REQUEST)
        .then(({ body }) => {
          const expectedResponse = expect.objectContaining({
            message: 'Invalid credentials',
          });

          expect(body).toEqual(expectedResponse);
        });
    });
  });
});
