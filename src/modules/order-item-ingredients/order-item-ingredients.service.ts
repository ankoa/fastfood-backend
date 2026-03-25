import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItemIngredient } from '../../entities/order-item-ingredient.entity';
import {
  CreateOrderItemIngredientDto,
  UpdateOrderItemIngredientDto,
} from './dtos';

@Injectable()
export class OrderItemIngredientsService {
  constructor(
    @InjectRepository(OrderItemIngredient)
    private readonly repo: Repository<OrderItemIngredient>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('OrderItemIngredient not found');
    return entity;
  }

  create(data: CreateOrderItemIngredientDto) {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: number, data: UpdateOrderItemIngredientDto) {
    const entity = await this.repo.findOneBy({ id });
    if (!entity) throw new NotFoundException('OrderItemIngredient not found');
    Object.assign(entity, data);
    return this.repo.save(entity);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.repo.delete(id);
    return { deleted: true };
  }
}
