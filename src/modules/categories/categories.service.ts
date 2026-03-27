import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Category } from '../../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { paginate } from 'src/common/utils/paginate.util';
import { Helpers } from 'src/common/utils/helpers';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly repo: Repository<Category>,
  ) {}

  async findAll(query: PaginationDto) {
    const qb = this.repo.createQueryBuilder('category');

    /*     qb.select(['category.id', 'category.name', 'category.createdAt']);
     */
    qb.where('category.isActive = true');
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
    if (!entity) throw new BadRequestException('Doanh mục không tồn tại');
    return entity;
  }

  async create(data: CreateCategoryDto) {
    const alreadyExists = await this.repo.findOne({
      where: { slug: Helpers.makeSlugFromString(data.name) },
    });
    if (alreadyExists)
      throw new BadRequestException('Doanh mục món ăn đã tồn tại');
    await this.repo.save(this.repo.create(data));
    return { message: 'Tạo danh mục thành công!' };
  }

  async update(id: number, data: UpdateCategoryDto) {
    const entity = await this.repo.findOneBy({ id });
    if (!entity) throw new BadRequestException('Doanh mục không tồn tại');
    /* Object.assign(entity, data); */

    const newSlug = data.name
      ? Helpers.makeSlugFromString(data.name)
      : entity.slug;

    const alreadyExists = await this.repo.findOne({
      where: {
        slug: newSlug,
        id: Not(id),
      },
    });
    if (alreadyExists) {
      throw new BadRequestException('Doanh mục món ăn đã tồn tại');
    }

    const result = await this.repo.update(id, {
      ...data,
      slug: newSlug,
    });
    const message =
      result.affected && result.affected > 0
        ? 'Cập nhật danh mục thành công!'
        : 'Không có thay đổi nào được thực hiện!';
    return { message };
  }

  async remove(id: number) {
    await this.findOne(id);
    return (await this.repo.delete(id))
      ? { message: 'Xóa danh mục thành công!' }
      : { message: 'Xóa danh mục thất bại!' };
  }
}
