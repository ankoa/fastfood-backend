import { CouponType } from '../../../entities/enums';

export class CouponDto {
  id!: number;
  code!: string;
  name!: string;
  description!: string;
  type!: CouponType;
  value!: number;
  minOrderAmount!: number;
  usageLimit!: number;
  usedCount!: number;
  startDate!: Date;
  endDate!: Date;
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}
