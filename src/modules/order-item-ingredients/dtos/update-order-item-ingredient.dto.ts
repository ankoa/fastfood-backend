import { IsNumber, IsOptional } from 'class-validator';

export class UpdateOrderItemIngredientDto {
  @IsOptional()
  @IsNumber()
  ingredientId?: number;

  @IsOptional()
  @IsNumber()
  orderItemId?: number;

  @IsOptional()
  @IsNumber()
  quantity?: number;
}
