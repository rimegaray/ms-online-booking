import { IsOptional, IsDateString } from 'class-validator';

export class UpdatePatientRequestDto {
  @IsOptional()
  @IsDateString(
    {},
    { message: 'La fecha de última sesión debe ser una fecha válida' },
  )
  lastSessionDate?: string;
}
