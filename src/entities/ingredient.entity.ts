import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ActiveEntity } from './base.entity';
import { CartItemIngredient } from './cart-item-ingredient.entity';
import { Category } from './category.entity';
import { OrderItemIngredient } from './order-item-ingredient.entity';
import { ProductIngredient } from './product-ingredient.entity';

@Entity({ name: 'ingredients' })
export class Ingredient extends ActiveEntity {
  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar' })
  imageUrl!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ type: 'int', default: 0 })
  price!: number;

  @Column({ type: 'bool', default: false })
  isRequired!: boolean;

  @Column({ type: 'int', name: 'categoryID' })
  categoryId!: number;

  @ManyToOne(() => Category, (category) => category.ingredients, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'categoryID' })
  category!: Category;

  @OneToMany(() => ProductIngredient, (pi) => pi.ingredient)
  productIngredients!: ProductIngredient[];

  @OneToMany(() => OrderItemIngredient, (oii) => oii.ingredient)
  orderItemIngredients!: OrderItemIngredient[];

  @OneToMany(() => CartItemIngredient, (cii) => cii.ingredient)
  cartItemIngredients!: CartItemIngredient[];
}
