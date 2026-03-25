import { IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOrderItemIngredientDto {
  @IsNotEmpty()
  @IsNumber()
  ingredientId!: number;

  @IsNotEmpty()
  @IsNumber()
  orderItemId!: number;

  @IsOptional()
  @IsNumber()
  quantity?: number;
}
