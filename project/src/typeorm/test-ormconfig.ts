import 'dotenv/config';
import { User } from 'src/users/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const jestDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST_TEST,
  port: +process.env.DB_PORT_TEST,
  username: process.env.DB_USER_TEST,
  password: process.env.DB_PASSWORD_TEST,
  database: process.env.DB_DATABASE_TEST,
  entities: [User],
  synchronize: true,
};

const testsDataSource = new DataSource(jestDataSourceOptions);

export default testsDataSource;
