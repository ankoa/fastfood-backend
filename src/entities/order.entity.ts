import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from './address.entity';
import { OrderStatus, PaymentMethod, PaymentStatus } from './enums';
import { OrderItem } from './order-item.entity';
import { Review } from './review.entity';
import { User } from './user.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', unique: true })
  orderNumber!: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.Pending,
  })
  status!: OrderStatus;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.Pending,
  })
  paymentStatus!: PaymentStatus;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.CashOnDelivery,
  })
  paymentMethod!: PaymentMethod;

  @Column({ type: 'int' })
  subTotal!: number;

  @Column({ type: 'int', nullable: true })
  deliveryFee!: number | null;

  @Column({ type: 'int', nullable: true })
  discount!: number | null;

  @Column({ type: 'int', nullable: true })
  total!: number | null;

  @Column({ type: 'text', nullable: true })
  notes!: string | null;

  @Column({ type: 'int', name: 'userID' })
  userId!: number;

  @Column({ type: 'int', name: 'addressId' })
  addressId!: number;

  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'userID' })
  user!: User;

  @ManyToOne(() => Address, (address) => address.orders, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'addressId' })
  address!: Address;

  @OneToMany(() => OrderItem, (item) => item.order)
  items!: OrderItem[];

  @OneToMany(() => Review, (review) => review.order)
  reviews!: Review[];
}

