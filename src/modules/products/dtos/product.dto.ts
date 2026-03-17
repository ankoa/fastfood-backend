export class ProductDto {
  id!: number;
  name!: string;
  slug!: string;
  description!: string | null;
  basePrice!: number;
  imageUrl!: string;
  isFeatured!: boolean;
  isActive!: boolean;
  categoryId!: number;
  createdAt!: Date;
  updatedAt!: Date;
}
