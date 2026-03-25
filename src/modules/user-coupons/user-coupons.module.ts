import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCoupon } from '../../entities/user-coupon.entity';
import { UserCouponsController } from './user-coupons.controller';
import { UserCouponsService } from './user-coupons.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserCoupon])],
  controllers: [UserCouponsController],
  providers: [UserCouponsService],
  exports: [TypeOrmModule],
})
export class UserCouponsModule {}
