import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configureDefaultValidationPipes } from 'src/app-bootstrap/routing.bootstrap';
import { jestDataSourceOptions } from 'src/typeorm/test-ormconfig';

const init = async ({ additionalModules = [] }) => {
  const moduleRef = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot(jestDataSourceOptions),
      ...additionalModules,
    ],
    providers: [],
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
