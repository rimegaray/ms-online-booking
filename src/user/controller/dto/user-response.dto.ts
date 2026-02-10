export class UserResponseDto {
  userId: number;
  username: string;
  password: string;
  profile?: string;
  entityId: number;
  isActive: boolean;
}
