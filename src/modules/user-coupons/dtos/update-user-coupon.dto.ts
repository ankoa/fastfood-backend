import { IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class UpdateUserCouponDto {
  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsNumber()
  couponId?: number;

  @IsOptional()
  @IsBoolean()
  isUsed?: boolean;

  @IsOptional()
  useAt?: Date;
}
