import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItemIngredient } from '../../entities/cart-item-ingredient.entity';
import {
  CreateCartItemIngredientDto,
  UpdateCartItemIngredientDto,
} from './dtos';

@Injectable()
export class CartItemIngredientsService {
  constructor(
    @InjectRepository(CartItemIngredient)
    private readonly repo: Repository<CartItemIngredient>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('CartItemIngredient not found');
    return entity;
  }

  create(data: CreateCartItemIngredientDto) {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: number, data: UpdateCartItemIngredientDto) {
    const entity = await this.repo.findOneBy({ id });
    if (!entity) throw new NotFoundException('CartItemIngredient not found');
    Object.assign(entity, data);
    return this.repo.save(entity);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.repo.delete(id);
    return { deleted: true };
  }
}
