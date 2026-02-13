import { User } from 'src/user/model/user.model';
import { UserRequestDto } from '../dto/user-request.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { PatchUserDto } from '../dto/user-patch.dto';

export class UserMapper {
  static toModel(dto: UserRequestDto): User {
    return {
      userId: 0,
      username: dto.username.trim(),
      password: dto.password.trim(),
      profile: dto.profile,
      email: dto.email,
      entityId: dto.entityId,
      isActive: dto.isActive,
    };
  }

  static toResponse(model: User): UserResponseDto {
    return {
      userId: model.userId,
      username: model.username,
      password: model.password,
      profile: model.profile,
      email: model.email,
      entityId: model.entityId,
      isActive: model.isActive,
    };
  }

  static toUpdateModel(dto: PatchUserDto): Partial<User> {
    return {
      email: dto.email,
    };
  }
}
