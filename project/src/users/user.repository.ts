import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, hashUserPassword } from './entities/user.entity';
import { DataSource } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDTO } from './dto/filter-user.dto';
import { BaseRepository } from 'src/shared/repositories/base.repository';
import { DBErrorType, parseDBError } from 'src/shared/db/parseDBError';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  /**
   * Create a new User and save it to the database.
   *
   * @param {CreateUserDto} createUserDto
   * @return {*}  {Promise<User>}
   * @memberof UserRepository
   */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    let user: User | undefined = undefined;
    try {
      user = this.create(createUserDto);
      user.hashedPassword = await hashUserPassword(createUserDto.password);
      user = await this.save(user);
    } catch (error) {
      if (parseDBError(error).type === DBErrorType.DUPLICATE_ENTRY) {
        throw new ConflictException(
          'Already exist a user with the same email.',
        );
      }
      throw error;
    }
    return user;
  }

  /**
   * Get a list of Users and filter by role and department.
   
   *
   * @param {FilterUserDTO} filter
   * @return {*}  {Promise<User[]>}
   * @memberof UserRepository
   */
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

  /**
   * Get a User by id or throw a NotFoundException.
   *
   * @param {number} id
   * @return {*}  {Promise<User>}
   * @memberof UserRepository
   */
  async getUserById(id: number): Promise<User> {
    const user = await this.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User not found with id: ${id}.`);
    }
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User not found with email: ${email}.`);
    }
    return user;
  }

  /**
   * Update a user and save it to the database.
   *
   * @param {number} id
   * @param {*} updateUserDto
   * @return {*}  {Promise<User>}
   * @memberof UserRepository
   */
  async updateUser(id: number, updateUserDto: any): Promise<User> {
    const user = await this.getUserById(id);
    user.updateFields(updateUserDto);
    return this.save(user);
  }
}
