import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ActiveEntity } from './base.entity';
import { CartItem } from './cart-item.entity';
import { OrderItem } from './order-item.entity';
import { Product } from './product.entity';
import { ProductVariantSize, ProductVariantType } from './enums';

@Entity({ name: 'product_variants' })
export class ProductVariant extends ActiveEntity {
  @Column({ type: 'varchar' })
  name!: string;

  @Column({
    type: 'enum',
    enum: ProductVariantSize,
    default: ProductVariantSize.Size15cm,
  })
  size!: ProductVariantSize;

  @Column({
    type: 'enum',
    enum: ProductVariantType,
    default: ProductVariantType.Normal,
  })
  type!: ProductVariantType;

  @Column({ type: 'int', default: 0 })
  modifiedPrice!: number;

  @Column({ type: 'int', name: 'productId' })
  productId!: number;

  @ManyToOne(() => Product, (product) => product.variants, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product!: Product;

  @OneToMany(() => CartItem, (ci) => ci.variant)
  cartItems!: CartItem[];

  @OneToMany(() => OrderItem, (oi) => oi.variant)
  orderItems!: OrderItem[];
}
