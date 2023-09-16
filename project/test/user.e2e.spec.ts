import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import createTestApp from './createTestApp';
import testsDataSource from 'src/typeorm/test-ormconfig';
import {
  DepartmentEnum,
  RoleEnum,
  TShirtSizeEnum,
  User,
} from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UserAuthServiceMock } from './user-auth-service.mock';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

describe('User (e2e) TEST', () => {
  let testApp: INestApplication;
  let userRepository: Repository<User>;
  let userAuthServiceMock: UserAuthServiceMock;
  const userDto = {
    name: 'Daniel',
    email: 'examplee2@example.com',
    phone: '699123457',
    tShirtSize: TShirtSizeEnum.L,
    department: DepartmentEnum.QA,
    roles: RoleEnum.TESTER,
    password: 'pasword1-',
  };

  let accessToken = '';

  beforeEach(async () => {
    const { moduleRef, app } = await createTestApp({
      additionalModules: [],
    });
    testApp = await app.init();

    userAuthServiceMock = await moduleRef.resolve(UserAuthServiceMock);
    accessToken = await userAuthServiceMock.getAuthenticateUserToken();

    userRepository = await testsDataSource
      .initialize()
      .then((dataSource) => dataSource.getRepository(User));
  });

  afterEach(async () => {
    await userRepository.delete({});
    testsDataSource.destroy();
    await testApp.close();
  });

  it('/users (POST). Should return 401 status code, Unauthorized, when no access_token.', async () => {
    const response = await request(testApp.getHttpServer())
      .post('/api/users')
      .send(userDto)
      .auth('', { type: 'bearer' })
      .expect(401);

    expect(response.body.message).toBe('Unauthorized');
  });

  it('/users (POST). Should create a User.', async () => {
    const response = await request(testApp.getHttpServer())
      .post('/api/users')
      .send(userDto)
      .auth(accessToken, { type: 'bearer' })
      .expect(201);

    expect(response.body.name).toBe(userDto.name);
  });

  it('/users (POST). Should Not create a duplicated User.', async () => {
    await request(testApp.getHttpServer())
      .post('/api/users')
      .send(userDto)
      .auth(accessToken, { type: 'bearer' });

    const response = await request(testApp.getHttpServer())
      .post('/api/users')
      .send(userDto)
      .auth(accessToken, { type: 'bearer' })
      .expect(409);

    expect(response.body.message).toBe(
      'Already exist a user with the same email.',
    );
  });

  it('/users (PATCH). Should update partially.', async () => {
    const user = await request(testApp.getHttpServer())
      .post('/api/users')
      .send(userDto)
      .auth(accessToken, { type: 'bearer' });

    const updateUserDto: UpdateUserDto = {
      department: DepartmentEnum.TECH,
      roles: RoleEnum.DEVELOPER,
      tShirtSize: TShirtSizeEnum.XXL,
    };

    const response = await request(testApp.getHttpServer())
      .patch(`/api/users/${user.body.id}`)
      .send(updateUserDto)
      .auth(accessToken, { type: 'bearer' })
      .expect(200);

    expect(response.body.department).toBe(updateUserDto.department);
    expect(response.body.roles).toBe(updateUserDto.roles);
    expect(response.body.tShirtSize).toBe(updateUserDto.tShirtSize);
  });

  it('/users (GET). Should filter users.', async () => {
    const userDtoTech = (userDto.department = DepartmentEnum.TECH);
    await request(testApp.getHttpServer())
      .post('/api/users')
      .send(userDto)
      .auth(accessToken, { type: 'bearer' });
    await request(testApp.getHttpServer())
      .post('/api/users')
      .send(userDtoTech)
      .auth(accessToken, { type: 'bearer' });

    const response = await request(testApp.getHttpServer())
      .get(`/api/users`)
      .query({ department: DepartmentEnum.TECH })
      .auth(accessToken, { type: 'bearer' })
      .expect(200);

    expect(response.body.length).toBe(1);
  });
});
