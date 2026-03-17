import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
  IsDateString,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreatePatientRequestDto {
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @Length(1, 255, { message: 'El nombre debe tener entre 1 y 255 caracteres' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
    message: 'El nombre solo puede contener letras y espacios',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  name!: string;

  @IsString({ message: 'El apellido debe ser un texto' })
  @IsNotEmpty({ message: 'El apellido no puede estar vacío' })
  @Length(1, 255, {
    message: 'El apellido debe tener entre 1 y 255 caracteres',
  })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
    message: 'El apellido solo puede contener letras y espacios',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  lastname!: string;

  @IsInt({ message: 'La edad debe ser un número entero' })
  @Min(1, { message: 'La edad mínima es 1 año' })
  @Max(99, { message: 'La edad máxima es 99 años' })
  @Type(() => Number)
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
  @Length(1, 255, {
    message: 'El nombre del tutor debe tener entre 1 y 255 caracteres',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  tutorName?: string | null;

  @IsOptional()
  @IsString({ message: 'Las observaciones deben ser un texto' })
  @Length(0, 500, {
    message: 'Las observaciones no pueden superar los 500 caracteres',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  observations?: string | null;

  @IsOptional()
  @IsDateString(
    {},
    { message: 'La fecha de última sesión debe ser una fecha válida' },
  )
  lastSessionDate?: string | null;
}
