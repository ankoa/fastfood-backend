import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import {
  ProductVariantSize,
  ProductVariantType,
} from '../../../entities/enums';

export class UpdateProductVariantDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(ProductVariantSize)
  size?: ProductVariantSize;

  @IsOptional()
  @IsEnum(ProductVariantType)
  type?: ProductVariantType;

  @IsOptional()
  @IsNumber()
  modifiedPrice?: number;

  @IsOptional()
  @IsNumber()
  productId?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
