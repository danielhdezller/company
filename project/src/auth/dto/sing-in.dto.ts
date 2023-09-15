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
    description: `Password should be more that 8 character, 
    a combination of alphanumeric and special character it and
   shall not contain any two identical consecutive characters.`,
    example: 'pasword1-',
  })
  @isValidPassword()
  password: string;
}
