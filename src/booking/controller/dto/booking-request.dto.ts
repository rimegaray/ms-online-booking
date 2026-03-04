import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsDate,
  IsISO8601,
} from 'class-validator';
import { Type } from 'class-transformer';

export class BookingRequestDto {
  @IsInt({ message: 'El patientId debe ser un número entero' })
  patientId!: number;

  @IsInt({ message: 'El psychologistId debe ser un número entero' })
  psychologistId!: number;

  @IsInt({ message: 'El serviceId debe ser un número entero' })
  serviceId!: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'La fecha de la reserva debe ser una fecha válida' })
  //@IsISO8601()
  bookingDate!: Date;

  @IsString({ message: 'El rango de tiempo debe ser un texto' })
  @IsNotEmpty({ message: 'El rango de tiempo no puede estar vacío' })
  timeRange!: string;

  @IsOptional()
  @IsString({ message: 'Las notas deben ser un texto' })
  notes?: string;

  @IsOptional()
  @IsString({ message: 'La nota de estado debe ser un texto' })
  statusNote?: string;
}
