import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductVariant } from '../../entities/product-variant.entity';
import { CreateProductVariantDto, UpdateProductVariantDto } from './dtos';

@Injectable()
export class ProductVariantsService {
  constructor(
    @InjectRepository(ProductVariant)
    private readonly repo: Repository<ProductVariant>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('ProductVariant not found');
    return entity;
  }

  create(data: CreateProductVariantDto) {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: number, data: UpdateProductVariantDto) {
    const entity = await this.repo.preload({ id, ...data });
    if (!entity) throw new NotFoundException('ProductVariant not found');
    return this.repo.save(entity);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.repo.delete(id);
    return { deleted: true };
  }
}
