import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SingInDto } from '../dto/sing-in.dto';
import { SigInResponseDTO } from '../dto/sing-in-response.dto';
import { JwtPayload } from '../auth.interface';
import { castAndValidate } from 'src/shared/transform-to-dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async singUp(createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  /**
   * Sing in a user in the application.
   *
   * @param {SingInDto} signInCredentials
   * @return {*}  {Promise<SigInResponseDTO>}
   * @memberof AuthService
   */
  async signIn(signInCredentials: SingInDto): Promise<SigInResponseDTO> {
    const { email, password } = signInCredentials;
    const user: User = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException(
        `The user: ${email} credentials are not valid.`,
      );
    }

    const isValidPassword = await user.checkPassword(password);

    if (!isValidPassword) {
      throw new UnauthorizedException(
        `The user: ${email} credentials are not valid.`,
      );
    }

    const jwtUserToken: JwtPayload = {
      userId: user.id,
    };

    return castAndValidate(SigInResponseDTO, {
      access_token: this.jwtService.sign(jwtUserToken),
    });
  }
}
