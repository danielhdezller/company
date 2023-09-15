import { DtoOptionalProperty } from 'src/shared/dto-property';
import { DepartmentEnum, RoleEnum } from '../entities/user.entity';
import { IsEnum } from 'class-validator';

export class FilterUserDTO {
  @DtoOptionalProperty({ enum: DepartmentEnum, example: DepartmentEnum.TECH })
  @IsEnum(DepartmentEnum)
  department: DepartmentEnum;

  @DtoOptionalProperty({ enum: DepartmentEnum, example: RoleEnum.DEVELOPER })
  @IsEnum(RoleEnum)
  role: RoleEnum;
}
