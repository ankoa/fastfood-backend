import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from '../../entities/cart-item.entity';
import { CreateCartItemDto, UpdateCartItemDto } from './dtos';

@Injectable()
export class CartItemsService {
  constructor(
    @InjectRepository(CartItem)
    private readonly repo: Repository<CartItem>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('CartItem not found');
    return entity;
  }

  create(data: CreateCartItemDto) {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: number, data: UpdateCartItemDto) {
    const entity = await this.repo.findOneBy({ id });
    if (!entity) throw new NotFoundException('CartItem not found');
    Object.assign(entity, data);
    return this.repo.save(entity);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.repo.delete(id);
    return { deleted: true };
  }
}
