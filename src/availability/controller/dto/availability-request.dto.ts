import {
  IsInt,
  IsOptional,
  IsDateString,
  IsBoolean,
  MaxLength,
} from 'class-validator';

export class AvailabilityRequestDto {
  @IsInt({ message: 'psychologistId: debe ser un entero' })
  psychologistId: number;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha debe tener formato YYYY-MM-DD' })
  date?: string;

  @MaxLength(20, { message: 'El rango de tiempo no puede tener más de 20 caracteres' })
  timeRange: string;

  @IsOptional()
  @IsBoolean({ message: 'isActive debe ser true o false' })
  isActive?: boolean;
}
