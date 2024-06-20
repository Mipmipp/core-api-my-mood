import { HttpStatus, INestApplication } from '@nestjs/common';
import { join } from 'path';
import * as request from 'supertest';

import { loadFixtures } from '@data/util/loader';

import { userToken } from '@/tests/test.constants';
import { testModuleBootstrapper } from '@/tests/test.module.bootstrapper';

import { MoodType } from '../../domain/mood.type';
import { CreateTrackDto } from '../dto/create-track.dto';
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

  const createTrackto: CreateTrackDto = {
    userId: 1,
    day: 1,
    month: 1,
    year: 2024,
    mood: MoodType.SAD,
    note: 'test',
  };

  describe('Post - [POST /track]', () => {
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
  });

  describe('Get - [GET /track/tracks/filtered]', () => {
    it('should return all tracks filtered by user id, month and year', async () => {
      const trackCreated = createTrackto;

      return request(app.getHttpServer())
        .get('/track/tracks/filtered')
        .auth(userToken, { type: 'bearer' })
        .send({ month: 1, year: 2024, userId: 1 })
        .expect(HttpStatus.OK)
        .then(({ body }) => {
          const expectedResponse = expect.objectContaining(trackCreated);

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
  });

  describe('Patch - [PATCH /track/:id]', () => {
    it('should update a track', async () => {
      const updateTrackDto: UpdateTrackDto = {
        userId: 1,
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
  });
});
