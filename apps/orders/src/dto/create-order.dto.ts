import {
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsPhoneNumber()
  phoneNumber: string;
}

export type TCreateOrderDto = Omit<CreateOrderDto, ''>;
