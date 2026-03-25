import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { CouponType } from '../../../entities/enums';

export class CreateCouponDto {
  @IsNotEmpty()
  @IsString()
  code!: string;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(CouponType)
  type?: CouponType;

  @IsOptional()
  @IsNumber()
  value?: number;

  @IsOptional()
  @IsNumber()
  minOrderAmount?: number;

  @IsOptional()
  @IsNumber()
  maxUses?: number;

  @IsOptional()
  @IsNumber()
  currentUses?: number;

  @IsOptional()
  validFrom?: Date;

  @IsOptional()
  validTo?: Date;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
