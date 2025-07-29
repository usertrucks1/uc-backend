import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './bookings.entity';
import { User } from 'src/users/user.entity';
import { Slots } from 'src/slots/slots.entity';
import { BookingService } from './bookings.service';
import { BookingController } from './bookings.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, User, Slots])],
  providers: [BookingService],
  controllers: [BookingController],
})
export class BookingModule {}
