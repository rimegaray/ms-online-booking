import {
  IsInt,
  IsOptional,
  IsDateString,
  IsBoolean,
  MaxLength,
} from 'class-validator';

export class AvailabilityRequestDto {
  @IsInt()
  psychologistId: number;

  @IsOptional()
  @IsDateString()
  date?: string;

  @MaxLength(20)
  timeRange: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
