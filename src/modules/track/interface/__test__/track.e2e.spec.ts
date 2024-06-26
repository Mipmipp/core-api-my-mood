import { HttpStatus, INestApplication } from '@nestjs/common';
import { join } from 'path';
import * as request from 'supertest';

import { loadFixtures } from '@data/util/loader';

import { userToken } from '@/tests/test.constants';
import { testModuleBootstrapper } from '@/tests/test.module.bootstrapper';

import { MoodType } from '../../domain/mood.type';
import { CreateTrackDto } from '../dto/create-track.dto';
import { GetUserTrackDto } from '../dto/get-user-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';

describe('Track - [/track]', () => {
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

  describe('Get - [GET /track/tracks/filtered]', () => {
    it('should return all tracks filtered by user id, month and year', async () => {
      return request(app.getHttpServer())
        .get('/track/tracks/filtered')
        .auth(userToken, { type: 'bearer' })
        .send({ month: 1, year: 2024, userId: 1 })
        .expect(HttpStatus.OK)
        .then(({ body }) => {
          const expectedResponse = expect.objectContaining({
            userId: 1,
            day: 1,
            month: 1,
            year: 2024,
            mood: MoodType.HAPPY,
            note: 'Note 1',
          });

          expect(body).toHaveLength(1);
          expect(body).toEqual([expectedResponse]);
        });
    });

    it('should not return any tracks if it does not exist', async () => {
      return request(app.getHttpServer())
        .get('/track/tracks/filtered')
        .auth(userToken, { type: 'bearer' })
        .send({ month: 10, year: 2024, userId: 1 })
        .expect(HttpStatus.OK)
        .then(({ body }) => {
          expect(body).toHaveLength(0);
        });
    });

    it('should not be able to get a track with a foreign user id', async () => {
      return request(app.getHttpServer())
        .get('/track/tracks/filtered')
        .auth(userToken, { type: 'bearer' })
        .send({ month: 2, year: 2024, userId: 2 })
        .expect(HttpStatus.FORBIDDEN)
        .then(({ body }) => {
          const expectedResponse = expect.objectContaining({
            message: 'Users cannot manage foreign tracks.',
          });

          expect(body).toEqual(expectedResponse);
        });
    });
  });

  describe('Get - [GET /track]', () => {
    it('should return a specific track', async () => {
      const getUserTrackDto: GetUserTrackDto = {
        userId: 1,
        day: 1,
        month: 1,
        year: 2024,
      };

      return request(app.getHttpServer())
        .get('/track')
        .auth(userToken, { type: 'bearer' })
        .send(getUserTrackDto)
        .expect(HttpStatus.OK)
        .then(({ body }) => {
          const expectedResponse = expect.objectContaining({
            ...getUserTrackDto,
          });

          expect(body).toEqual(expectedResponse);
        });
    });

    it('should not be able to get a track with a foreign user id', async () => {
      const getUserTrackDto: GetUserTrackDto = {
        userId: 2,
        day: 1,
        month: 1,
        year: 2024,
      };

      return request(app.getHttpServer())
        .get('/track')
        .auth(userToken, { type: 'bearer' })
        .send(getUserTrackDto)
        .expect(HttpStatus.FORBIDDEN)
        .then(({ body }) => {
          const expectedResponse = expect.objectContaining({
            message: 'Users cannot manage foreign tracks.',
          });

          expect(body).toEqual(expectedResponse);
        });
    });
  });

  describe('Post - [POST /track]', () => {
    const createTrackto: CreateTrackDto = {
      userId: 1,
      day: 3,
      month: 5,
      year: 2024,
      mood: MoodType.SAD,
      note: 'test',
    };

    it('should create a track', async () => {
      return request(app.getHttpServer())
        .post('/track')
        .auth(userToken, { type: 'bearer' })
        .send(createTrackto)
        .expect(HttpStatus.CREATED)
        .then(({ body }) => {
          const expectedResponse = expect.objectContaining({
            ...createTrackto,
          });

          expect(body).toEqual(expectedResponse);
        });
    });

    it('should not be able to create a track if it already exists', async () => {
      return request(app.getHttpServer())
        .post('/track')
        .auth(userToken, { type: 'bearer' })
        .send(createTrackto)
        .expect(HttpStatus.CONFLICT)
        .then(({ body }) => {
          const expectedResponse = expect.objectContaining({
            message:
              'Track already exists for user 1 on day 3, month 5 and year 2024',
          });

          expect(body).toEqual(expectedResponse);
        });
    });

    it('should not be able to create a track with a foreign user id', async () => {
      return request(app.getHttpServer())
        .post('/track')
        .auth(userToken, { type: 'bearer' })
        .send({ ...createTrackto, userId: 2 })
        .expect(HttpStatus.FORBIDDEN)
        .then(({ body }) => {
          const expectedResponse = expect.objectContaining({
            message: 'Users cannot manage foreign tracks.',
          });

          expect(body).toEqual(expectedResponse);
        });
    });
  });

  describe('Patch - [PATCH /track/:id]', () => {
    it('should update a track', async () => {
      const updateTrackDto: UpdateTrackDto = {
        mood: MoodType.HAPPY,
      };

      return request(app.getHttpServer())
        .patch('/track/1')
        .auth(userToken, { type: 'bearer' })
        .send(updateTrackDto)
        .expect(HttpStatus.OK)
        .then(({ body }) => {
          const expectedResponse = expect.objectContaining(updateTrackDto);

          expect(body).toEqual(expectedResponse);
        });
    });

    it('should not be able to update a track with a foreign user id', async () => {
      const updateTrackDto: UpdateTrackDto = {
        mood: MoodType.HAPPY,
      };

      return request(app.getHttpServer())
        .patch('/track/2')
        .auth(userToken, { type: 'bearer' })
        .send({ ...updateTrackDto, userId: 2 })
        .expect(HttpStatus.FORBIDDEN)
        .then(({ body }) => {
          const expectedResponse = expect.objectContaining({
            message: 'Users cannot manage foreign tracks.',
          });

          expect(body).toEqual(expectedResponse);
        });
    });
  });
});
