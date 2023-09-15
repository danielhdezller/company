import { IsJWT } from 'class-validator';
import { DtoProperty } from 'src/shared/dto-property';

export class SigInResponseDTO {
  @DtoProperty({
    description: 'JWT access token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0',
  })
  @IsJWT()
  access_token: string;
}
