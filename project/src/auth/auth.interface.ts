import { IsInt } from 'class-validator';
import { DtoOptionalProperty } from 'src/shared/dto-property';

export class JwtPayload {
  @DtoOptionalProperty()
  @IsInt()
  userId?: number;

  @DtoOptionalProperty()
  @IsInt()
  iat?: number;

  @DtoOptionalProperty()
  @IsInt()
  exp?: number;
}
