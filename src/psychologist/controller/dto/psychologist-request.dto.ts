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
  @IsString()
  @IsNotEmpty()
  @Length(0, 255)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @Length(0, 255)
  lastname!: string;

  @IsInt()
  @IsInt({ message: 'La edad debe ser un número entero' })
  @Min(1, { message: 'La edad mínima es 1 año' })
  @Max(99, { message: 'La edad máxima es 99 años' })
  age!: number;

  @IsString()
  @IsOptional()
  specialty?: string;

  @Matches(/^9\d{8}$/, {message: 'El número de teléfono debe tener 9 digitos'})
  phoneNumber!: string;

  @IsOptional()
  @IsString()
  address?: string;

  @Length(8, 8)
  dni!: string;

  @Length(0, 75)
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  email!: string;

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
