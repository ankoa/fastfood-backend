import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ingredient } from './ingredient.entity';
import { Product } from './product.entity';

@Entity({ name: 'product_ingredients' })
export class ProductIngredient {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int', name: 'ingredientId' })
  ingredientId!: number;

  @Column({ type: 'int', name: 'productId' })
  productId!: number;

  @Column({ type: 'bool' })
  isDefault!: boolean;

  @Column({ type: 'int', nullable: true })
  quantity!: number | null;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.productIngredients, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ingredientId' })
  ingredient!: Ingredient;

  @ManyToOne(() => Product, (product) => product.productIngredients, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product!: Product;
}
