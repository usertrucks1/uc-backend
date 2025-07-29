import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/user.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ConfigModule.forRoot(),DatabaseModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
