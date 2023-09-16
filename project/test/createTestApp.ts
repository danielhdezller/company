import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configureDefaultValidationPipes } from 'src/app-bootstrap/routing.bootstrap';
import { AuthModule } from 'src/auth/auth.module';
import { jestDataSourceOptions } from 'src/typeorm/test-ormconfig';
import { UsersModule } from 'src/users/users.module';
import { UserAuthServiceMock } from './user-auth-service.mock';

const init = async ({ additionalModules = [] }) => {
  const moduleRef = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot(jestDataSourceOptions),
      AuthModule,
      UsersModule,
      ...additionalModules,
    ],
    providers: [UserAuthServiceMock],
  }).compile();

  const app = moduleRef.createNestApplication();
  app.setGlobalPrefix('api');
  configureDefaultValidationPipes(app);

  await app.init();

  return {
    moduleRef,
    app,
  };
};

export default init;
