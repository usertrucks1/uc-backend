import { Controller, Get, Query } from '@nestjs/common';
import { BookingService } from './bookings.service';
import { GetBookingsByPhoneResponseDTO } from './bookings.dto';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  async getBookingsByPhone(
    @Query('phone_number') phone_number: string,
  ): Promise<GetBookingsByPhoneResponseDTO[]> {
    return this.bookingService.getBookingsByPhone(phone_number);
  }
}
