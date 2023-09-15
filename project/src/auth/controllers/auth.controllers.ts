import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SingInDto } from '../dto/sing-in.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SigInResponseDTO } from '../dto/sing-in-response.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiResponse({ type: SigInResponseDTO })
  signIn(@Body() signInDto: SingInDto): Promise<SigInResponseDTO> {
    return this.authService.signIn(signInDto);
  }

  @Post('register')
  singUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.singUp(createUserDto);
  }
}
