import { IsNumber, IsOptional } from 'class-validator';

export class UpdateCartItemIngredientDto {
  @IsOptional()
  @IsNumber()
  ingredientId?: number;

  @IsOptional()
  @IsNumber()
  cartItemId?: number;

  @IsOptional()
  @IsNumber()
  quantity?: number;
}
