import { IsInt, IsNotEmpty, IsPhoneNumber, IsString, Matches, Min } from 'class-validator';
import { BookingStatus } from './bookings.entity';

export class GetBookingsByPhoneDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[6-9]\d{9}$/, { message: 'Phone number must be 10 digits and start with 6-9' })
  phone_number: string;
}

export class GetBookingsByPhoneResponseDTO {
  id: number;
  status: BookingStatus;
  booking_time: Date;
  created_at: Date;
  updated_at: Date;

  slot: {
    id: number;
    start_time: Date;
    end_time: Date;
  };

  provider: {
    id: number;
    name: string;
  };
}

export class CancelBookingRequestDTO {
  @IsInt()
  @Min(1)
  booking_id: number;
}