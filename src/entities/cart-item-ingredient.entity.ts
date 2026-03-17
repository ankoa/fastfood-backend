import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CartItem } from './cart-item.entity';
import { Ingredient } from './ingredient.entity';

// NOTE: your schema names this table `cart` (singular)
@Entity({ name: 'cart' })
export class CartItemIngredient {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int', default: 1 })
  quantity!: number;

  @Column({ type: 'int', name: 'ingredientId' })
  ingredientId!: number;

  @Column({ type: 'int', name: 'cartItemId' })
  cartItemId!: number;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.cartItemIngredients, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ingredientId' })
  ingredient!: Ingredient;

  @ManyToOne(() => CartItem, (cartItem) => cartItem.ingredients, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cartItemId' })
  cartItem!: CartItem;
}
