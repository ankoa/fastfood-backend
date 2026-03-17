export class ProductIngredientDto {
  id!: number;
  ingredientId!: number;
  productId!: number;
  isDefault!: boolean;
  quantity!: number | null;
  createdAt!: Date;
  updatedAt!: Date;
}
