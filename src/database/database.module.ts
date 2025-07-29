import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/bookings/bookings.entity';
import { Category } from 'src/category/category.entity';
import { Provider } from 'src/providers/provider.entity';
import { Slot } from 'src/slots/slots.entity';
import { User } from 'src/users/user.entity';
import { WorkingDay } from 'src/working-days/working-days.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Category, Provider, WorkingDay, User, Slot, Booking],
      synchronize: true,
    }),
  ],
    exports:[TypeOrmModule]
})
export class DatabaseModule {}
