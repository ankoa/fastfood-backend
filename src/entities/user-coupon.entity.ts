import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Coupon } from './coupon.entity';
import { User } from './user.entity';

@Entity({ name: 'user_coupons' })
export class UserCoupon {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'bool', default: false })
  isUsed!: boolean;

  @Column({ type: 'timestamp', nullable: true })
  useAt!: Date | null;

  @Column({ type: 'int', name: 'userId' })
  userId!: number;

  @Column({ type: 'int', name: 'couponId' })
  couponId!: number;

  @ManyToOne(() => User, (user) => user.userCoupons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @ManyToOne(() => Coupon, (coupon) => coupon.userCoupons, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'couponId' })
  coupon!: Coupon;
}
