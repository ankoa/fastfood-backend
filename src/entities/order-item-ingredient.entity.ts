import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Ingredient } from './ingredient.entity';
import { OrderItem } from './order-item.entity';

@Entity({ name: 'order_item_ingredients' })
export class OrderItemIngredient {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int', name: 'ingredientId' })
  ingredientId!: number;

  // NOTE: your schema uses `ordeItemId` (typo kept intentionally)
  @Column({ type: 'int', name: 'ordeItemId' })
  orderItemId!: number;

  @Column({ type: 'int', nullable: true })
  quantity!: number | null;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.orderItemIngredients, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ingredientId' })
  ingredient!: Ingredient;

  @ManyToOne(() => OrderItem, (orderItem) => orderItem.ingredients, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ordeItemId' })
  orderItem!: OrderItem;
}

