import { Type } from "class-transformer";
import { IsDate, IsEmpty, IsEnum, IsOptional, IsString } from "class-validator";
import { BookingState } from "src/booking/model/booking.model";

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

    @IsEnum(BookingState)
    state!: BookingState;

    @IsOptional()
    statusNote?: string;
}