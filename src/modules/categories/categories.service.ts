import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';
import { ApiResponse } from 'src/common/interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { paginate } from 'src/common/utils/paginate.util';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly repo: Repository<Category>,
  ) {}

  async findAll(query: PaginationDto) {
    const qb = this.repo.createQueryBuilder('category');

    if (query.search) {
      qb.andWhere('category.name ILIKE :search', {
        search: `%${query.search}%`,
      });
    }

    if (query.sortBy) {
      qb.orderBy(`category.${query.sortBy}`, query.order ?? 'ASC');
    }

    return paginate(qb, query.page, query.limit);
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Category not found');
    return entity;
  }

  create(data: CreateCategoryDto) {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: number, data: UpdateCategoryDto) {
    const entity = await this.repo.findOneBy({ id });
    if (!entity) throw new NotFoundException('Category not found');
    Object.assign(entity, data);
    return this.repo.save(entity);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.repo.delete(id);
    return { deleted: true };
  }
}
