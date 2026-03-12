import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserResponseDto } from './dto/user-response.dto';
import { UserRequestDto } from './dto/user-request.dto';
import { UserMapper } from './mapper/user.mapper';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { PatchUserDto } from './dto/user-patch.dto';
import {
  RegisterPatientRequestDto,
  RegisterPatientResponseDto,
} from './dto/register-patient.dto';

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
  async patchUser(
    @Param('userId') userId: string,
    @Body() userRequest: PatchUserDto,
  ): Promise<UserResponseDto> {
    const model = UserMapper.toUpdateModel(userRequest);
    const user = await this.userService.patchUser(Number(userId), model);
    return UserMapper.toResponse(user);
  }

  @Post('patient')
  async registerPatient(
    @Body() dto: RegisterPatientRequestDto,
  ): Promise<RegisterPatientResponseDto> {
    const patientModel = UserMapper.toPatientModel(dto);
    const userModel = UserMapper.toUserModel(dto);

    const result = await this.userService.registerPatient(
      patientModel,
      userModel,
    );

    return UserMapper.toResponsePatient(result);
  }

  @UseGuards(JwtAuthGuard)
  @Get('exist/:username')
  async usernameExist(@Param('username') username: string) {
    const exist = await this.userService.userNameExist(username);
    return { available: !exist };
  }
}
