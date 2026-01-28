import {
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class PatientRequestDto {
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

  @Length(8, 8)
  dni: string;

  @Matches(/^9\d{8}$/)
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @Length(0, 255)
  tutorName: string;
  admissionDate: string;
  observations: string;
  lastSessionDate: string;
  signedConsent: string | null;
}
