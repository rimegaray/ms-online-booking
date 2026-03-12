import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';

export class ProcessingRequestDto {
  @IsNumber()
  @IsNotEmpty()
  amount!: number;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{8}$/, {
    message: 'Debe contener exactamente 8 dígitos numéricos',
  })
  transactionId!: string;
}
