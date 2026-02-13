import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class PatchUserDto {

    @IsOptional()
    @IsEmail({}, { message: 'El email $value no es válido' })
    email?: string;
}