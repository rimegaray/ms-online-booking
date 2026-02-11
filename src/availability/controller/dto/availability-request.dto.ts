import {
  IsInt,
  IsOptional,
  IsDateString,
  MaxLength,
  IsString,
} from 'class-validator';
import { AvailabilityStatus } from 'src/availability/model/availability.model';

export class AvailabilityRequestDto {
  @IsInt({ message: 'psychologistId: debe ser un entero' })
  psychologistId!: number;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha debe tener formato YYYY-MM-DD' })
  date?: string;

  @MaxLength(20, { message: 'El rango de tiempo no puede tener más de 20 caracteres' })
  timeRange!: string;

  @IsOptional()
  @IsString({ message: 'El estado debe ser texto' })
  isActive?: AvailabilityStatus;
}
