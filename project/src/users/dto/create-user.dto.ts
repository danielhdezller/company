import { PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { DtoProperty } from 'src/shared/dto-property';
import { isValidPassword } from 'src/shared/validators/is-valid-password.validator';

export class CreateUserDto extends PickType(User, [
  'name',
  'email',
  'phone',
  'tShirtSize',
  'department',
  'roles',
] as const) {
  @DtoProperty({
    description: `Password should be more that 8 character, 
    a combination of alphanumeric and special character it and
   shall not contain any two identical consecutive characters.`,
  })
  @isValidPassword()
  password: string;
}
