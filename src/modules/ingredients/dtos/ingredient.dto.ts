export class IngredientDto {
  id!: number;
  name!: string;
  imageUrl!: string;
  description!: string | null;
  price!: number;
  isRequired!: boolean;
  isActive!: boolean;
  categoryId!: number;
  createdAt!: Date;
  updatedAt!: Date;
}
