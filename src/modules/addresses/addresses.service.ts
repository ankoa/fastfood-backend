import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../../entities/address.entity';
import { CreateAddressDto, UpdateAddressDto } from './dtos';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly repo: Repository<Address>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Address not found');
    return entity;
  }

  create(data: CreateAddressDto) {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: number, data: UpdateAddressDto) {
    const entity = await this.repo.findOneBy({ id });
    if (!entity) throw new NotFoundException('Address not found');
    Object.assign(entity, data);
    return this.repo.save(entity);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.repo.delete(id);
    return { deleted: true };
  }
}
