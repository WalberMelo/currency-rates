import { IsNumber, IsString } from 'class-validator';

export class CreateRatesDto {
  @IsString()
  lastupdate: string;

  @IsString()
  currency: string;

  @IsNumber()
  rate: number;
}
