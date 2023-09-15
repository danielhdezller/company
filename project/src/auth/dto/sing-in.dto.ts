import { IsEmail } from 'class-validator';
import { DtoProperty } from 'src/shared/dto-property';
import { isValidPassword } from 'src/shared/validators/is-valid-password.validator';

export class SingInDto {
  @DtoProperty({
    description: 'User email',
    example: 'admin@admin.com',
  })
  @IsEmail()
  email: string;

  @DtoProperty({
    description: 'User password',
    example: 'pass',
  })
  @isValidPassword()
  password: string;
}
