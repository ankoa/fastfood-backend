import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from '../../entities/order-item.entity';
import { CreateOrderItemDto, UpdateOrderItemDto } from './dtos';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly repo: Repository<OrderItem>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('OrderItem not found');
    return entity;
  }

  create(data: CreateOrderItemDto) {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: number, data: UpdateOrderItemDto) {
    const entity = await this.repo.findOneBy({ id });
    if (!entity) throw new NotFoundException('OrderItem not found');
    Object.assign(entity, data);
    return this.repo.save(entity);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.repo.delete(id);
    return { deleted: true };
  }
}
