import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SessionRequestDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  bookingId: number;

  @IsInt()
  patientId: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  sessionDate?: Date;
}
