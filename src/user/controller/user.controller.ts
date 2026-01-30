import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserResponseDto } from './dto/user-response.dto';
import { UserRequestDto } from './dto/user-request.dto';
import { UserMapper } from './mapper/user.mapper';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Promise<UserResponseDto[]> {
    return this.userService.getUsers();
  }

  @Get(':userId')
  getUserById(@Param('userId') userId: string): Promise<UserResponseDto> {
    return this.userService.getUserById(Number(userId));
  }

  @UseGuards(JwtAuthGuard)
  @Post('patient')
  async postUserPatient(
    @Body() userRequestDto: UserRequestDto,
  ): Promise<UserResponseDto> {
    const model = UserMapper.toModel(userRequestDto);
    const newUser = await this.userService.createUserPatient(model);
    return UserMapper.toResponse(newUser);
  }

  @Post()
  async postUser(
    @Body() userRequestDto: UserRequestDto,
  ): Promise<UserResponseDto> {
    const model = UserMapper.toModel(userRequestDto);
    const newUser = await this.userService.createUser(model);
    return UserMapper.toResponse(newUser);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() userRequestDto: UserRequestDto,
  ): Promise<UserResponseDto> {
    let model = UserMapper.toModel(userRequestDto);
    model = {
      ...model,
      userId: Number(userId),
    };
    const updateUser = await this.userService.updateUser(model);
    return UserMapper.toResponse(updateUser);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string): Promise<void> {
    return this.userService.deleteUser(Number(userId));
  }
}
