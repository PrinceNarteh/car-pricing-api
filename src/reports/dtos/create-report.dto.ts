import { IsNumber, IsString } from 'class-validator';

export class CreateReportDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  year: number;

  @IsNumber()
  mileage: number;

  @IsNumber()
  longitude: number;

  @IsNumber()
  latitude: number;

  @IsNumber()
  price: number;
}
