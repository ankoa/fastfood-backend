import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
}

export abstract class ActiveEntity extends BaseEntity {
  @Column({ type: 'bool', default: true })
  isActive!: boolean;
}
