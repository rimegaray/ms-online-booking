import { Type } from "class-transformer";
import { IsDate, IsOptional } from "class-validator";

export class UpdatePatientRequestDto {

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    lastSessionDate?: Date;
}