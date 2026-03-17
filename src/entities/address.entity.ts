import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { User } from './user.entity';

@Entity({ name: 'addresses' })
export class Address {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', nullable: true })
  street!: string | null;

  @Column({ type: 'varchar' })
  city!: string;

  @Column({ type: 'varchar' })
  district!: string;

  @Column({ type: 'varchar', nullable: true })
  ward!: string | null;

  @Column({ type: 'float' })
  latitude!: number;

  @Column({ type: 'float' })
  longitude!: number;

  @Column({ type: 'bool', default: false })
  isDefault!: boolean;

  @Column({ type: 'int', name: 'userID' })
  userId!: number;

  @ManyToOne(() => User, (user) => user.addresses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userID' })
  user!: User;

  @OneToMany(() => Order, (order) => order.address)
  orders!: Order[];
}
