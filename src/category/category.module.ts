import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategorySeeder } from './category.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategorySeeder],
})
export class CategoryModule {}
