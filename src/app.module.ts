import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/user.module';
import { DatabaseModule } from './database.module';
import { CategoryModule } from './category/category.module';
import { ProviderModule } from './providers/provider.module';
import { WorkingDaysModule } from './working-days/working-day.module';

@Module({
  imports: [ConfigModule.forRoot(),DatabaseModule, UserModule, CategoryModule, ProviderModule, WorkingDaysModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
