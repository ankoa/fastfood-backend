import { Column, Entity, OneToMany } from 'typeorm';
import { ActiveEntity } from './base.entity';
import { Ingredient } from './ingredient.entity';
import { Product } from './product.entity';

@Entity({ name: 'categories' })
export class Category extends ActiveEntity {
  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar', unique: true })
  slug!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ type: 'int', default: 0 })
  sortOrder!: number;

  @OneToMany(() => Product, (product) => product.category)
  products!: Product[];

  @OneToMany(() => Ingredient, (ingredient) => ingredient.category)
  ingredients!: Ingredient[];
}
