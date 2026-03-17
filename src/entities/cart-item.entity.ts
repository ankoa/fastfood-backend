import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from './cart.entity';
import { CartItemIngredient } from './cart-item-ingredient.entity';
import { Product } from './product.entity';
import { ProductVariant } from './product-variant.entity';

@Entity({ name: 'cart_items' })
export class CartItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int', name: 'cartId' })
  cartId!: number;

  @Column({ type: 'int', default: 1 })
  quantity!: number;

  @Column({ type: 'int', name: 'productId' })
  productId!: number;

  @Column({ type: 'int', name: 'variantId', nullable: true })
  variantId!: number | null;

  @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cartId' })
  cart!: Cart;

  @ManyToOne(() => Product, (product) => product.cartItems, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'productId' })
  product!: Product;

  @ManyToOne(() => ProductVariant, (variant) => variant.cartItems, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'variantId' })
  variant!: ProductVariant | null;

  @OneToMany(() => CartItemIngredient, (cii) => cii.cartItem)
  ingredients!: CartItemIngredient[];
}
