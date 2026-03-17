import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ActiveEntity } from './base.entity';
import { Category } from './category.entity';
import { CartItem } from './cart-item.entity';
import { OrderItem } from './order-item.entity';
import { ProductIngredient } from './product-ingredient.entity';
import { ProductVariant } from './product-variant.entity';
import { Review } from './review.entity';

@Entity({ name: 'products' })
export class Product extends ActiveEntity {
  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar', unique: true })
  slug!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ type: 'int' })
  basePrice!: number;

  @Column({ type: 'varchar' })
  imageUrl!: string;

  @Column({ type: 'bool', default: false })
  isFeatured!: boolean;

  @Column({ type: 'int', name: 'categoryId' })
  categoryId!: number;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'categoryId' })
  category!: Category;

  @OneToMany(() => ProductVariant, (variant) => variant.product)
  variants!: ProductVariant[];

  @OneToMany(() => ProductIngredient, (pi) => pi.product)
  productIngredients!: ProductIngredient[];

  @OneToMany(() => Review, (review) => review.product)
  reviews!: Review[];

  @OneToMany(() => CartItem, (ci) => ci.product)
  cartItems!: CartItem[];

  @OneToMany(() => OrderItem, (oi) => oi.product)
  orderItems!: OrderItem[];
}
