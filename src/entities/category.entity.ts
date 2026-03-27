import { Column, Entity, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import { ActiveEntity } from './base.entity';
import { Ingredient } from './ingredient.entity';
import { Product } from './product.entity';
import { Helpers } from 'src/common/utils/helpers';
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

  @BeforeInsert()
  @BeforeUpdate()
  /* @BeforeInsert()
  @BeforeUpdate() cả 2 chỉ chạy vs save() ko dùng cho update() */
  makeSlug() {
    console.log('Generated slug:', this.name);
    if (this.name) {
      this.slug = Helpers.makeSlugFromString(this.name);
    }
  }
}
