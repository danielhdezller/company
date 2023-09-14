import { IsEmail, IsEnum, IsPhoneNumber } from 'class-validator';
import { APP_DB_SPECS } from 'src/shared/app.enum';
import { AppEntity } from 'src/shared/base.entity';
import { DtoProperty } from 'src/shared/dto-property';
import { IsNotEmptyString } from 'src/shared/validators/is-not-empty-string.validator';
import { Column, Entity } from 'typeorm';

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
}
