import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';
import { User } from './user.entity';

@Entity({ name: 'review' })
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int', comment: '1-5' })
  rating!: number;

  @Column({ type: 'varchar', nullable: true })
  comment!: string | null;

  @Column({ type: 'int', name: 'userId' })
  userId!: number;

  @Column({ type: 'int', name: 'productId' })
  productId!: number;

  @Column({ type: 'int', name: 'orderId' })
  orderId!: number;

  @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @ManyToOne(() => Product, (product) => product.reviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product!: Product;

  @ManyToOne(() => Order, (order) => order.reviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order!: Order;
}

