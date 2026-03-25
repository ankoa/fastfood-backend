import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../../entities/cart.entity';
import { CreateCartDto, UpdateCartDto } from './dtos';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private readonly repo: Repository<Cart>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Cart not found');
    return entity;
  }

  create(data: CreateCartDto) {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: number, data: UpdateCartDto) {
    const entity = await this.repo.findOneBy({ id });
    if (!entity) throw new NotFoundException('Cart not found');
    Object.assign(entity, data);
    return this.repo.save(entity);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.repo.delete(id);
    return { deleted: true };
  }
}
