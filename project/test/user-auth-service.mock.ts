import { Injectable } from '@nestjs/common';
import { SingInDto } from 'src/auth/dto/sing-in.dto';
import { AuthService } from 'src/auth/services/auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import {
  DepartmentEnum,
  RoleEnum,
  TShirtSizeEnum,
} from 'src/users/entities/user.entity';
import { UserRepository } from 'src/users/user.repository';

@Injectable()
export class UserAuthServiceMock {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {}

  async getAuthenticateUserToken() {
    const userAdminDto: CreateUserDto = {
      name: 'DanielAdmin',
      email: 'admin@example.com',
      phone: '699123457',
      tShirtSize: TShirtSizeEnum.L,
      department: DepartmentEnum.QA,
      roles: RoleEnum.DEVELOPER,
      password: 'pasword1-',
    };

    const userAdmin = await this.userRepository.createUser(userAdminDto);

    const singInDto = new SingInDto();
    singInDto.email = userAdmin.email;
    singInDto.password = userAdminDto.password;
    const { access_token } = await this.authService.signIn(singInDto);
    return access_token;
  }
}
