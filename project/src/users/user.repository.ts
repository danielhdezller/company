import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDTO } from './dto/filter-user.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.create(createUserDto);
    //TODO: Auth module with hash method.
    user.hashedPassword = createUserDto.password;
    return this.save(user);
  }

  async findAll(filter: FilterUserDTO): Promise<User[]> {
    const query = this.createQueryBuilder('users');

    if (filter.department) {
      query.andWhere('users.department = :department', {
        department: filter.department,
      });
    }
    if (filter.role) {
      query.andWhere('users.roles = :role', {
        role: filter.role,
      });
    }

    return query.getMany();
  }
}
