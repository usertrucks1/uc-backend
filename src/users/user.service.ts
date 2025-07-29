import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UserFactory } from './user.factory';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
    private readonly factory: UserFactory,
  ) {}

  findAll(): Promise<User[]> {
    return this.repo.find();
  }

  async findById(id: number): Promise<User> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    const user = this.factory.createUser(dto);
    return await this.repo.save(user);
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    const updated = this.factory.updateUser(user, dto);
    return await this.repo.save(updated);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findById(id);
    user.is_active = false;
    await this.repo.save(user);
  }
}
