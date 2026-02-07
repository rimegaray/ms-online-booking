import { IsBoolean, IsEnum, IsInt, IsOptional, IsPositive, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { UserProfile } from "src/user/model/user.model";

export class UserRequestDto {

  @IsString({ message: 'username: debe ser un texto' })
  @MinLength(3, { message: 'username: debe tener al menos 3 caracteres' })
  @MaxLength(20, { message: 'username: no puede tener más de 20 caracteres' })
  username: string;

  @IsString({ message: 'password: debe ser un texto' })
  @MinLength(6, { message: 'password: debe tener al menos 6 caracteres' })
  @MaxLength(50, { message: 'password: no puede tener más de 50 caracteres' })
  password: string;

  @IsEnum(UserProfile, {message: 'profile: El perfil debe ser uno de los siguientes valores: PATIENT, PSYCHOLOGIST, SECRETARY, ADMINISTRATOR'})
  @IsOptional()
  profile: UserProfile;

  @IsString({ message: 'name: debe ser un texto' })
  @MinLength(1, { message: 'name: no puede estar vacío' })
  @MaxLength(50, { message: 'name: no puede tener más de 50 caracteres' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, {
    message: 'name: solo puede contener letras y espacios',
  })
  name: string;

  @IsString({ message: 'lastname: debe ser un texto' })
  @MinLength(1, { message: 'lastname: no puede estar vacío' })
  @MaxLength(50, { message: 'lastname: no puede tener más de 50 caracteres' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, {
    message: 'lastname: solo puede contener letras y espacios',
  })
  lastname: string;

  @IsInt({ message: 'entityId: debe ser un número entero' })
  @IsPositive({ message: 'entityId: debe ser positivo' })
  entityId: number;

  @IsBoolean({ message: 'isActive: debe ser un valor booleano' })
  @IsOptional()
  isActive: boolean;
}
