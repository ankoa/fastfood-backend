import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dtos';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepo.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  create(data: CreateUserDto) {
    return this.usersRepo.save(this.usersRepo.create(data));
  }

  async update(id: number, data: UpdateUserDto) {
    const entity = await this.usersRepo.preload({ id, ...data });
    if (!entity) throw new NotFoundException('User not found');
    return this.usersRepo.save(entity);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.usersRepo.delete(id);
    return { deleted: true };
  }
}
