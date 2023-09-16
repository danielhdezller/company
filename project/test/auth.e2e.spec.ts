import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import createTestApp from './createTestApp';
import { User } from 'src/users/entities/user.entity';
import testsDataSource from 'src/typeorm/test-ormconfig';
import { Repository } from 'typeorm';

describe('Auth controller (e2e)', () => {
  let testApp: INestApplication;
  let userRepository: Repository<User>;

  const userDto = {
    name: 'Daniel',
    email: 'examplee@example.com',
    phone: '699123457',
    tShirtSize: 'L',
    department: 'QA',
    roles: 'TESTER',
    password: 'pasword1-',
  };

  beforeEach(async () => {
    const { app } = await createTestApp({
      additionalModules: [],
    });
    testApp = await app.init();

    userRepository = await testsDataSource
      .initialize()
      .then((dataSource) => dataSource.getRepository(User));
  });

  afterEach(async () => {
    await userRepository.delete({});
    testsDataSource.destroy();
    await testApp.close();
  });

  it('/ (POST) Auth register, should register a User.', async () => {
    const response = await request(testApp.getHttpServer())
      .post('/api/auth/register')
      .send(userDto)
      .expect(201);

    expect(response.body.name).toBe(userDto.name);
  });

  it('/ (POST) Auth login, should return access_token.', async () => {
    await request(testApp.getHttpServer())
      .post('/api/auth/register')
      .send(userDto)
      .expect(201);

    const response = await request(testApp.getHttpServer())
      .post('/api/auth/login')
      .send({ email: userDto.email, password: userDto.password })
      .expect(201);

    expect(response.body.access_token.length).toBeGreaterThan(1);
  });

  it('/ (POST) Auth login, should return 422 status code, Unprocessable Entity without body.', async () => {
    const response = await request(testApp.getHttpServer())
      .post('/api/auth/login')
      .expect(422);

    expect(response.body.error).toBe('Unprocessable Entity');
  });

  it('/ (POST) Auth login, should return 404 status code, Not found, when user not found in DB.', async () => {
    const wrongEmail = 'wrong.email@mail.com';
    const response = await request(testApp.getHttpServer())
      .post('/api/auth/login')
      .send({ email: wrongEmail, password: userDto.password })
      .expect(404);

    expect(response.body.error).toBe('Not Found');
  });

  it('/ (POST) Auth login, should return 401 status code, Unauthorized, when wrong password.', async () => {
    const wrongPassword = 'pasword2-';
    await request(testApp.getHttpServer())
      .post('/api/auth/register')
      .send(userDto);
    const response = await request(testApp.getHttpServer())
      .post('/api/auth/login')
      .send({ email: userDto.email, password: wrongPassword })
      .expect(401);

    expect(response.body.error).toBe('Unauthorized');
  });
});
