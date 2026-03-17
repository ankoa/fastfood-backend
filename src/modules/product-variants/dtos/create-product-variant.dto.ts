import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { ProductVariantSize, ProductVariantType } from '../../../entities/enums';

export class CreateProductVariantDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsOptional()
  @IsEnum(ProductVariantSize)
  size?: ProductVariantSize;

  @IsOptional()
  @IsEnum(ProductVariantType)
  type?: ProductVariantType;

  @IsOptional()
  @IsNumber()
  modifiedPrice?: number;

  @IsNotEmpty()
  @IsNumber()
  productId!: number;
}
