import { IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCartItemIngredientDto {
  @IsNotEmpty()
  @IsNumber()
  ingredientId!: number;

  @IsNotEmpty()
  @IsNumber()
  cartItemId!: number;

  @IsOptional()
  @IsNumber()
  quantity?: number;
}
