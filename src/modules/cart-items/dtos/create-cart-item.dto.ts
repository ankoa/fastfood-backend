import { IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCartItemDto {
  @IsNotEmpty()
  @IsNumber()
  cartId!: number;

  @IsNotEmpty()
  @IsNumber()
  productId!: number;

  @IsOptional()
  @IsNumber()
  variantId?: number;

  @IsOptional()
  @IsNumber()
  quantity?: number;
}
