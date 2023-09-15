import { IntersectionType, PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { SingInDto } from 'src/auth/dto/sing-in.dto';

export class CreateUserDto extends IntersectionType(
  PickType(User, [
    'name',
    'email',
    'phone',
    'tShirtSize',
    'department',
    'roles',
  ] as const),
  PickType(SingInDto, ['password'] as const),
) {}
