import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemIngredient } from '../../entities/cart-item-ingredient.entity';
import { CartItemIngredientsController } from './cart-item-ingredients.controller';
import { CartItemIngredientsService } from './cart-item-ingredients.service';

@Module({
  imports: [TypeOrmModule.forFeature([CartItemIngredient])],
  controllers: [CartItemIngredientsController],
  providers: [CartItemIngredientsService],
  exports: [TypeOrmModule],
})
export class CartItemIngredientsModule {}
