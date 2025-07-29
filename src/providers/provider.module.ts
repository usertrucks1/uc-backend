import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './provider.entity';
import { ProviderSeeder } from './provider.seeder';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
import { Category } from 'src/category/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Provider, Category])],
  providers: [ProviderSeeder, ProviderService],
  controllers: [ProviderController],
  exports: [TypeOrmModule, ProviderService]
})
export class ProviderModule {}
