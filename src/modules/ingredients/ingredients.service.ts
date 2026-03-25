import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from '../../entities/ingredient.entity';
import { CreateIngredientDto, UpdateIngredientDto } from './dtos';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private readonly repo: Repository<Ingredient>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Ingredient not found');
    return entity;
  }

  create(data: CreateIngredientDto) {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: number, data: UpdateIngredientDto) {
    const entity = await this.repo.findOneBy({ id });
    if (!entity) throw new NotFoundException('Ingredient not found');
    Object.assign(entity, data);
    return this.repo.save(entity);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.repo.delete(id);
    return { deleted: true };
  }
}
