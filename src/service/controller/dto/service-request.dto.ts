import { IsNotEmpty, IsString } from "class-validator";

export class ServiceRequestDto {

    @IsString()
    @IsNotEmpty()
    name: string;
    description: string;
    price: number;
    image: string;
    isActive: boolean;
}