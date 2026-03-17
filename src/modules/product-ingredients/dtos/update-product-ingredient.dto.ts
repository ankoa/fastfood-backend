import { IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class UpdateProductIngredientDto {
  @IsOptional()
  @IsNumber()
  ingredientId?: number;

  @IsOptional()
  @IsNumber()
  productId?: number;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;

  @IsOptional()
  @IsNumber()
  quantity?: number;
}
