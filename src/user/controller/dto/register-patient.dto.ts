import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Length, Matches, Max, MaxLength, Min, MinLength } from "class-validator";

export class RegisterPatientRequestDto {

  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @Length(0, 255, { message: 'El nombre debe tener entre 1 y 255 caracteres' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, {
    message: 'name: solo puede contener letras y espacios',
  })
  name!: string;

  @IsString({ message: 'El apellido debe ser un texto' })
  @IsNotEmpty({ message: 'El apellido no puede estar vacío' })
  @Length(0, 255, { message: 'El apellido debe tener entre 1 y 255 caracteres' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, {
    message: 'lastname: solo puede contener letras y espacios',
  })
  lastname!: string;

  @IsInt({ message: 'La edad debe ser un número entero' })
  @Min(1, { message: 'La edad mínima es 1 año' })
  @Max(99, { message: 'La edad máxima es 99 años' })
  age!: number;

  @IsString({ message: 'El DNI debe ser un texto' })
  @Length(8, 8, { message: 'El DNI debe tener exactamente 8 dígitos' })
  @Matches(/^\d{8}$/, { message: 'El DNI solo debe contener números' })
  dni!: string;

  @IsString({ message: 'El número de celular debe ser un texto' })
  @Matches(/^9\d{8}$/, {
    message: 'El número de celular debe empezar con 9 y tener 9 dígitos',
  })
  phoneNumber!: string;

  @IsOptional()
  @IsString({ message: 'El nombre del tutor debe ser un texto' })
  @Length(0, 255, {
      message: 'El nombre del tutor debe tener entre 1 y 255 caracteres',
  })
  tutorName?: string;

  @IsString({ message: 'username: debe ser un texto' })
  @MinLength(3, { message: 'username: debe tener al menos 3 caracteres' })
  @MaxLength(20, { message: 'username: no puede tener más de 20 caracteres' })
  username!: string;

  @IsString({ message: 'password: debe ser un texto' })
  @MinLength(6, { message: 'password: debe tener al menos 6 caracteres' })
  @MaxLength(50, { message: 'password: no puede tener más de 50 caracteres' })
  password!: string;

  @IsOptional()
  @IsEmail({}, { 
    message: 'El email $value no es válido' 
  })
  email!: string;
}

export class RegisterPatientResponseDto {
  patientId!: number;
  name!: string;
  lastname!: string;
  age!: number;
  dni!: string;
  phoneNumber!: string;
  tutorName?: string;
  
  userId!: number;
  username!: string;
  password!: string;
  profile?: string;
  email?: string;
  entityId!: number;
  isActive?: boolean;
}
