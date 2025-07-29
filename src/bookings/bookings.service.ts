import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './bookings.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { GetBookingsByPhoneResponseDTO } from './bookings.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepo: Repository<Booking>,
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

  async getBookingsByPhone(phone_number: string): Promise<GetBookingsByPhoneResponseDTO[]> {
    const user = await this.userRepo.findOne({ where: { phone_number } });
    if (!user) throw new NotFoundException('User not found');

    const bookings = await this.bookingRepo.find({
      where: { user: { id: user.id } },
      relations: {
        slots: {
          provider: true
        },
      },
      order: { booking_time: 'DESC' },
    });

    return bookings.map(b => ({
      id: b.id,
      status: b.status,
      booking_time: b.booking_time,
      created_at: b.created_at,
      updated_at: b.updated_at,
      slot: {
        id: b.slots.id,
        start_time: b.slots.start_time,
        end_time: b.slots.end_time,
      },
      provider: {
        id: b.slots.provider.id,
        name: b.slots.provider.first_name + " " + b.slots.provider.last_name,
      },
    }));
  }
}
