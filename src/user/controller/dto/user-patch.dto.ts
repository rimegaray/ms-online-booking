import { IsEmail, IsOptional } from 'class-validator';

export class PatchUserDto {
  @IsOptional()
  @IsEmail({}, { message: 'El email $value no es válido' })
  email?: string;
}
