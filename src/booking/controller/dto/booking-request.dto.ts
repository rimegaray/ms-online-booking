import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

export class BookingRequestDto {
  @IsInt()
  patientId: number;

  @IsInt()
  psychologistId: number;

  @IsInt()
  serviceId: number;

  @Type(() => Date)
  @IsDate()
  bookingDate: Date;

  @IsString()
  @IsNotEmpty()
  timeRange: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
