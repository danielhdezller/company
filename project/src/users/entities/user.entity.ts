import { IsEmail, IsEnum, IsPhoneNumber } from 'class-validator';
import { APP_DB_SPECS } from 'src/shared/app.enum';
import { AppEntity } from 'src/shared/base.entity';
import { DtoProperty } from 'src/shared/dto-property';
import { IsNotEmptyString } from 'src/shared/validators/is-not-empty-string.validator';
import { Column, Entity } from 'typeorm';
import { compare as compareHash, genSalt, hash } from 'bcryptjs';

export enum TShirtSizeEnum {
  L = 'L',
  XL = 'XL',
  XXL = 'XXL',
}

export enum DepartmentEnum {
  TECH = 'TECH',
  QA = 'QA',
}

export enum RoleEnum {
  DEVELOPER = 'DEVELOPER',
  TESTER = 'TESTER',
}

@Entity()
export class User extends AppEntity {
  @Column({
    length: APP_DB_SPECS.MEDIUM_TEXT,
  })
  @DtoProperty({
    description: 'User name.',
    example: 'Daniel',
  })
  @IsNotEmptyString()
  name: string;

  @Column({
    length: APP_DB_SPECS.MAX_EMAIL_LENGTH,
    unique: true,
  })
  @DtoProperty({
    description: 'Email of the user.',
    example: 'example@example.com',
  })
  @IsEmail()
  email: string;

  @Column({
    length: APP_DB_SPECS.MAX_PHONE_LENGTH,
  })
  @DtoProperty({
    example: '+34699123457',
    description: 'Phone number of the user from Spain.',
  })
  @IsPhoneNumber('ES')
  phone: string;

  @Column({
    length: APP_DB_SPECS.LONG_TEXT,
  })
  @IsNotEmptyString()
  hashedPassword: string;

  @Column({
    type: 'enum',
    enum: TShirtSizeEnum,
  })
  @DtoProperty({
    type: 'enum',
    enum: TShirtSizeEnum,
    example: TShirtSizeEnum.L,
    description: 'TShirt size of the user.',
  })
  @IsEnum(TShirtSizeEnum)
  tShirtSize: TShirtSizeEnum;

  @Column({
    type: 'enum',
    enum: DepartmentEnum,
  })
  @DtoProperty({
    type: 'enum',
    enum: DepartmentEnum,
    example: DepartmentEnum.QA,
    description: 'Department of the user.',
  })
  @IsEnum(DepartmentEnum)
  department: DepartmentEnum;

  @Column({
    type: 'enum',
    enum: RoleEnum,
  })
  @DtoProperty({
    type: 'enum',
    enum: RoleEnum,
    example: RoleEnum.TESTER,
    description: 'RoleEnum of the user.',
  })
  @IsEnum(RoleEnum)
  roles: RoleEnum;

  /**
   * Check if the provided password is valid.
   *
   * @param {string} password
   * @returns {boolean}
   * @memberof User
   */
  async checkPassword(password: string): Promise<boolean> {
    return await compareHash(password, this.hashedPassword);
  }
}

/**
 * Generates a hash object using a password and a optional salt.
 * If the salt is not provided creates a new one.
 *
 * @private
 * @param {string} rawPassword  The raw password to transform into a hash.
 * @param {string} [customSalt] Optional salt, if the salt is not provided creates a new one.
 * @returns {Promise<HashPassword>}
 * @memberof User
 */
export async function hashUserPassword(
  rawPassword: string,
  customSalt?: string,
): Promise<string> {
  const salt = customSalt ?? (await genSalt());
  const password = await hash(rawPassword, salt);

  return password;
}
