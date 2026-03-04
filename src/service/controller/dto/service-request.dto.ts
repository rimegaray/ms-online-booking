import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Min,
} from 'class-validator';

export class ServiceRequestDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @Length(3, 255, {
    message: 'El nombre debe tener entre 3 y 255 caracteres',
  })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @Length(10, 1000, {
    message: 'La descripción debe tener entre 10 y 1000 caracteres',
  })
  description!: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'El precio debe ser numérico' })
  @Min(0, { message: 'El precio no puede ser negativo' })
  price!: number;

  @IsOptional()
  @IsString({ message: 'La imagen debe ser texto' })
  @Length(1, 500, {
    message: 'La imagen debe tener máximo 500 caracteres',
  })
  @IsUrl({}, { message: 'La imagen debe ser una URL válida' })
  image!: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
