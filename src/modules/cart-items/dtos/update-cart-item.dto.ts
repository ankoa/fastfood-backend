import { IsNumber, IsOptional } from 'class-validator';

export class UpdateCartItemDto {
  @IsOptional()
  @IsNumber()
  cartId?: number;

  @IsOptional()
  @IsNumber()
  productId?: number;

  @IsOptional()
  @IsNumber()
  variantId?: number;

  @IsOptional()
  @IsNumber()
  quantity?: number;
}
