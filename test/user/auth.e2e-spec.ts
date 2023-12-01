import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from '@/user/user.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  describe('/auth/login (POST)', () => {
    it('/auth/login (POST), should return token when username and password are correct', async () => {
      await request(app.getHttpServer()).post('/init');
      const resp = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'admin', password: 'abc886' })
        .expect(201);
      expect(resp.body.data.token).toBeDefined();
    });
    it('/auth/login (POST), should return 404 when username and password are incorrect', async () => {
      request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'admin', password: 'abc' })
        .expect(404);
    });
  });
  afterEach(async () => {
    app.close();
  });
});
