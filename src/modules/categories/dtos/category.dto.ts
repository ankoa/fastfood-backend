export class CategoryDto {
  id!: number;
  name!: string;
  slug!: string;
  description!: string | null;
  sortOrder!: number;
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}
