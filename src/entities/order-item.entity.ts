import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderItemIngredient } from './order-item-ingredient.entity';
import { Order } from './order.entity';
import { Product } from './product.entity';
import { ProductVariant } from './product-variant.entity';

// NOTE: your schema names this table `oder_items` (typo kept intentionally)
@Entity({ name: 'oder_items' })
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int', name: 'orderId' })
  orderId!: number;

  @Column({ type: 'int', name: 'productId' })
  productId!: number;

  @Column({ type: 'int', default: 1 })
  quantity!: number;

  @Column({ type: 'int', name: 'variantId', nullable: true })
  variantId!: number | null;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order!: Order;

  @ManyToOne(() => Product, (product) => product.orderItems, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'productId' })
  product!: Product;

  @ManyToOne(() => ProductVariant, (variant) => variant.orderItems, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'variantId' })
  variant!: ProductVariant | null;

  @OneToMany(() => OrderItemIngredient, (oii) => oii.orderItem)
  ingredients!: OrderItemIngredient[];
}

