import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { BookingService } from './bookings.service';
import { CancelBookingRequestDTO, GetBookingsByPhoneResponseDTO } from './bookings.dto';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  @Get()
  async getBookingsByPhone(
    @Query('phone_number') phone_number: string,
  ): Promise<GetBookingsByPhoneResponseDTO[]> {
    return this.bookingService.getBookingsByPhone(phone_number);
  }

  @Patch(':id/cancel')
  async cancelBooking(@Param('id', ParseIntPipe) booking_id: number,) {
    return this.bookingService.cancelBooking(booking_id);
  }

}
