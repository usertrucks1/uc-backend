import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository, Like } from 'typeorm';
import { CategoryResponseDto, GetCategoriesQueryDto } from './category.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async getAllCategories(query: GetCategoriesQueryDto) {
    const { search, page, limit } = query;
    const where = search ? { name: Like(`%${search}%`) } : {};

    let categories: Category[];
    let total: number;

    if (!page || !limit) {
      [categories, total] = await this.categoryRepo.findAndCount({
        where,
        order: { id: 'ASC' },
      });
    } else {
      [categories, total] = await this.categoryRepo.findAndCount({
        where,
        order: { id: 'ASC' },
        skip: (page - 1) * limit,
        take: limit,
      });
    }

    const formatted = plainToInstance(CategoryResponseDto, categories, {
      excludeExtraneousValues: true,
    });

    return {
      data: formatted,
      meta: {
        total,
        page: page || null,
        limit: limit || null,
      },
    };
  }
}
