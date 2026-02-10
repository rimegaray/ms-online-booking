import { Injectable } from '@nestjs/common';
import { User } from 'src/user/model/user.model';

@Injectable()
export class RepositoryMapper {
  static toDomain(prismaUser: any): User {
    return {
      userId: prismaUser.user_id,
      username: prismaUser.username,
      password: prismaUser.password,
      profile: prismaUser.profile,
      entityId: prismaUser.entity_id,
      isActive: prismaUser.is_active,
    };
  }
}
