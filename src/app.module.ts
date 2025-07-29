import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/user.module';
import { DatabaseModule } from './database.module';
import { CategoryModule } from './category/category.module';
import { ProviderModule } from './providers/provider.module';
import { WorkingDaysModule } from './working-days/working-day.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SlotsModule } from './slots/slots.module';
import { BookingModule } from './bookings/bookings.module';


@Module({
  imports: [ConfigModule.forRoot(), ScheduleModule.forRoot(),DatabaseModule, UserModule, CategoryModule, ProviderModule, WorkingDaysModule, SlotsModule, BookingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
