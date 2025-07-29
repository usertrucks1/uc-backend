import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategorySeeder implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async onApplicationBootstrap() {
    const defaultCategories = [
      { name: 'Electrician' },
      { name: 'Plumber' },
      { name: 'Cleaner' },
      { name: 'AC Repair' },
      { name: 'Salon at Home' },
      { name: 'Carpenter' },
      { name: 'Pest Control' },
      { name: 'Home Deep Cleaning' },
    ];

    for (const category of defaultCategories) {
      const exists = await this.categoryRepo.findOne({ where: { name: category.name } });
      if (!exists) {
        await this.categoryRepo.save(category);
      }
    }
  }
}
