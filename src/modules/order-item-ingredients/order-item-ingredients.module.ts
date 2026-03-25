import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemIngredient } from '../../entities/order-item-ingredient.entity';
import { OrderItemIngredientsController } from './order-item-ingredients.controller';
import { OrderItemIngredientsService } from './order-item-ingredients.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItemIngredient])],
  controllers: [OrderItemIngredientsController],
  providers: [OrderItemIngredientsService],
  exports: [TypeOrmModule],
})
export class OrderItemIngredientsModule {}
