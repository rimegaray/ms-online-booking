import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ServiceRequestDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    price: number;

    @IsString()
    @IsNotEmpty()
    image: string;

    @IsBoolean()
    isActive: boolean;
}