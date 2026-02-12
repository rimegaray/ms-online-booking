import { IsOptional, IsString } from "class-validator";

export class UpdateBookingDto{

    @IsOptional()
    @IsString()
    timeRange?: string;

    @IsOptional()
    @IsString()
    notes?: string;
}