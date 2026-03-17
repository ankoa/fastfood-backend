import { IsNumber, IsOptional, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateProductIngredientDto {
  @IsNotEmpty()
  @IsNumber()
  ingredientId!: number;

  @IsNotEmpty()
  @IsNumber()
  productId!: number;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;

  @IsOptional()
  @IsNumber()
  quantity?: number;
}
