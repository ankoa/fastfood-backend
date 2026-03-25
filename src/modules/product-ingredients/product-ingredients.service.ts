import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductIngredient } from '../../entities/product-ingredient.entity';
import { CreateProductIngredientDto, UpdateProductIngredientDto } from './dtos';

@Injectable()
export class ProductIngredientsService {
  constructor(
    @InjectRepository(ProductIngredient)
    private readonly repo: Repository<ProductIngredient>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('ProductIngredient not found');
    return entity;
  }

  create(data: CreateProductIngredientDto) {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: number, data: UpdateProductIngredientDto) {
    const entity = await this.repo.findOneBy({ id });
    if (!entity) throw new NotFoundException('ProductIngredient not found');
    Object.assign(entity, data);
    return this.repo.save(entity);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.repo.delete(id);
    return { deleted: true };
  }
}
