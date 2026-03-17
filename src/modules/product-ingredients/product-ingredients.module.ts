import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductIngredient } from '../../entities/product-ingredient.entity';
import { ProductIngredientsController } from './product-ingredients.controller';
import { ProductIngredientsService } from './product-ingredients.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductIngredient])],
  controllers: [ProductIngredientsController],
  providers: [ProductIngredientsService],
  exports: [TypeOrmModule],
})
export class ProductIngredientsModule {}

