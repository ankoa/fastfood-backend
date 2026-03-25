import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsNumber()
  rating!: number;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsNotEmpty()
  @IsNumber()
  userId!: number;

  @IsNotEmpty()
  @IsNumber()
  productId!: number;

  @IsNotEmpty()
  @IsNumber()
  orderId!: number;
}
