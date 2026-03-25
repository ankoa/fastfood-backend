import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon } from '../../entities/coupon.entity';
import { CreateCouponDto, UpdateCouponDto } from './dtos';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon)
    private readonly repo: Repository<Coupon>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Coupon not found');
    return entity;
  }

  create(data: CreateCouponDto) {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: number, data: UpdateCouponDto) {
    const entity = await this.repo.preload({ id, ...data });
    if (!entity) throw new NotFoundException('Coupon not found');
    return this.repo.save(entity);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.repo.delete(id);
    return { deleted: true };
  }
}
