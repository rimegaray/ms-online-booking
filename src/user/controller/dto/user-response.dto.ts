export class UserResponseDto {
  userId!: number;
  username!: string;
  password!: string;
  profile?: string;
  email!: string;
  entityId!: number;
  isActive!: boolean;
}
