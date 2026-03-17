import { Column, Entity, OneToMany } from 'typeorm';
import { ActiveEntity } from './base.entity';
import { CouponType } from './enums';
import { UserCoupon } from './user-coupon.entity';

@Entity({ name: 'coupons' })
export class Coupon extends ActiveEntity {
  @Column({ type: 'varchar', unique: true })
  code!: string;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar' })
  description!: string;

  @Column({
    type: 'enum',
    enum: CouponType,
    default: CouponType.Fixed,
  })
  type!: CouponType;

  @Column({ type: 'int' })
  value!: number;

  @Column({ type: 'int', default: 0 })
  minOrderAmount!: number;

  @Column({ type: 'int', default: 1 })
  maxUses!: number;

  @Column({ type: 'int', default: 0 })
  currentUses!: number;

  @Column({ type: 'timestamp' })
  validFrom!: Date;

  @Column({ type: 'timestamp' })
  validTo!: Date;

  @OneToMany(() => UserCoupon, (uc) => uc.coupon)
  userCoupons!: UserCoupon[];
}
