import { SelectQueryBuilder, ObjectLiteral } from 'typeorm';
import { PaginationMeta } from '../interface/index';

export async function paginate<T extends ObjectLiteral>(
  qb: SelectQueryBuilder<T>,
  page: number,
  limit: number,
): Promise<{ data: T[]; meta: PaginationMeta }> {
  const safeLimit = Math.min(limit, 100);

  const [data, total] = await qb
    .skip((page - 1) * safeLimit)
    .take(safeLimit)
    .getManyAndCount();
  console.log('Paginate query builder SQL:', data);
  return {
    data,
    meta: {
      total,
      page,
      limit: safeLimit,
      totalPages: Math.ceil(total / safeLimit),
    },
  };
}
