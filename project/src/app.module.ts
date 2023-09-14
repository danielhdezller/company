import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { dataSourceOptions } from './typeorm/ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
