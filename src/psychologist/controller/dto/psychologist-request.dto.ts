import {
  IsString,
  IsNotEmpty,
  Length,
  Matches,
  IsInt,
  Min,
  Max,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class PsychologistRequestDto {
  @IsString({ message: 'El nombre debe ser texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @Length(2, 255, { message: 'El nombre debe tener entre 2 y 255 caracteres' })
  name!: string;

  @IsString({ message: 'El apellido debe ser texto' })
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @Length(2, 255, {
    message: 'El apellido debe tener entre 2 y 255 caracteres',
  })
  lastname!: string;

  @IsInt({ message: 'La edad debe ser un número entero' })
  @Min(1, { message: 'La edad mínima es 1 año' })
  @Max(99, { message: 'La edad máxima es 99 años' })
  age!: number;

  @IsString()
  @IsOptional()
  specialty?: string;

  @Matches(/^9\d{8}$/, {
    message: 'El número de teléfono debe tener 9 digitos y empezar en 9',
  })
  phoneNumber!: string;

  @IsOptional()
  @IsString()
  address?: string;

  @Length(8, 8, { message: 'El DNI debe tener exactamente 8 dígitos' })
  @Matches(/^\d+$/, { message: 'El DNI solo debe contener números' })
  dni!: string;

  @IsString()
  @IsOptional()
  @Length(0, 255)
  experience?: string;

  @IsString()
  @IsOptional()
  @Length(0, 255)
  photo?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
