import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { FilterUserDTO } from './dto/filter-user.dto';
import { DeleteResult } from 'typeorm';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiResponse({ type: User })
  @ApiOperation({
    description: 'Create a User.',
  })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  //TODO: auth barer token.
  @Get()
  @ApiResponse({ type: [User] })
  @ApiOperation({
    description: 'Get a list of Users and filter by role and department.',
  })
  findAll(@Query() filter: FilterUserDTO): Promise<User[]> {
    return this.usersService.findAll(filter);
  }

  @Get(':id')
  @ApiResponse({ type: User })
  @ApiOperation({
    description: 'Get a User by id or throw a NotFoundException if not found.',
  })
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  @Patch(':id')
  @ApiResponse({ type: User })
  @ApiOperation({
    description: 'Update a User attributes: roles, department and tShirtSize.',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({ type: DeleteResult })
  @ApiOperation({
    description: 'Delete a User by id.',
  })
  removeUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.removeUser(id);
  }
}
