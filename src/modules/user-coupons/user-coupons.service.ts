import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCoupon } from '../../entities/user-coupon.entity';
import { CreateUserCouponDto, UpdateUserCouponDto } from './dtos';

@Injectable()
export class UserCouponsService {
  constructor(
    @InjectRepository(UserCoupon)
    private readonly repo: Repository<UserCoupon>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('UserCoupon not found');
    return entity;
  }

  create(data: CreateUserCouponDto) {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: number, data: UpdateUserCouponDto) {
    const entity = await this.repo.findOneBy({ id });
    if (!entity) throw new NotFoundException('UserCoupon not found');
    Object.assign(entity, data);
    return this.repo.save(entity);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.repo.delete(id);
    return { deleted: true };
  }
}
