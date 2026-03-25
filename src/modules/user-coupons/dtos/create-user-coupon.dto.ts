import { IsNumber, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserCouponDto {
  @IsNotEmpty()
  @IsNumber()
  userId!: number;

  @IsNotEmpty()
  @IsNumber()
  couponId!: number;

  @IsOptional()
  @IsBoolean()
  isUsed?: boolean;

  @IsOptional()
  useAt?: Date;
}
