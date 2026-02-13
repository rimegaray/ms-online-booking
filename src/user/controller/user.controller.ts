import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserResponseDto } from './dto/user-response.dto';
import { UserRequestDto } from './dto/user-request.dto';
import { UserMapper } from './mapper/user.mapper';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { PatchUserDto } from './dto/user-patch.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getUsers(): Promise<UserResponseDto[]> {
    return this.userService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  getUserById(@Param('userId') userId: string): Promise<UserResponseDto> {
    return this.userService.getUserById(Number(userId));
  }

  @Post('patient')
  async postUserPatient(
    @Body() userRequestDto: UserRequestDto,
  ): Promise<UserResponseDto> {
    const model = UserMapper.toModel(userRequestDto);
    const newUser = await this.userService.createUserPatient(model);
    return UserMapper.toResponse(newUser);
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Patch(':userId')
  async patchUser(@Param('userId') userId: string, @Body() userRequest: PatchUserDto): Promise<UserResponseDto> {
    const model = UserMapper.toUpdateModel(userRequest);
    const user = await this.userService.patchUser(Number(userId), model);
    return UserMapper.toResponse(user);
  }
}
