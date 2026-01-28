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
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(0, 255)
  lastname: string;

  @IsInt()
  @Min(1)
  @Max(99)
  age: number;

  @IsString()
  @IsNotEmpty()
  specialty: string;

  @Matches(/^9\d{8}$/)
  phoneNumber: string;

  @IsOptional()
  @IsString()
  address?: string;

  @Length(8, 8)
  dni: string;

  @Length(0, 75)
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(0, 255)
  experience: string;

  @IsString()
  @IsNotEmpty()
  @Length(0, 255)
  photo: string;

  @IsBoolean()
  isActive: boolean;
}
