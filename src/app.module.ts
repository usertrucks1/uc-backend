import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/user.module';
import { DatabaseModule } from './database.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [ConfigModule.forRoot(),DatabaseModule, UserModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
