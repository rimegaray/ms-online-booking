export class UserResponseDto {
  userId: number;
  username: string;
  password: string;
  profile?: string;
  name: string;
  lastname: string;
  patientId?: number;
  psychologistId?: number;
  isActive: boolean;
}
