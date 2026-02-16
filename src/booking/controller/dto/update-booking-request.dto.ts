import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString } from "class-validator";

export class UpdateBookingDto{

    @IsOptional()
    @IsString()
    timeRange?: string;

    @IsOptional()
    @IsString()
    notes?: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate({ message: 'La fecha de la reserva debe ser una fecha válida' })
    bookingDate?: Date;
}