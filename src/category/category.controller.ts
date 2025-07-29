import { Controller, Get, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ValidationPipe } from '@nestjs/common';
import { GetCategoriesQueryDto } from './category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAll(@Query(new ValidationPipe({ transform: true })) query: GetCategoriesQueryDto) {
    return this.categoryService.getAllCategories(query);
  }
}
