import { Expose, Transform, Type } from 'class-transformer';
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class GetAvailableSlotsDto {
  @IsNumber()
  provider_id: number;

  @IsDateString()
  start_date?: string;
}

export class SlotResponseDto {
  @Expose()
  id: number;

  @Expose()
  @Transform(({ value }) => new Date(value).toISOString())
  start_time: string;

  @Expose()
  @Transform(({ value }) => new Date(value).toISOString())
  end_time: string;

  @Expose()
  status: number;

  @Expose()
  @Transform(({ value }) => value ? new Date(value).toISOString() : null)
  slot_hold_time: string | null;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;

  @Expose()
  @Transform(({ obj }) => obj.provider?.id ?? null)
  provider_id: number;

  @Expose()
  @Transform(({ obj }) => obj.provider?.charges_per_slot_rupee ?? null)
  charges_per_slot_rupee: number;
}

export class HoldSlotDto {
  @IsNumber()
  slot_id: number;
  
  @IsBoolean()
  is_hold: boolean;
}
export class BookSlotDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsPhoneNumber('IN')
  phone_number: string;
}

export class CategoryDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}

export class ProviderDto {
  @Expose()
  id: number;

  @Expose()
  first_name: string;

  @Expose()
  last_name: string;

  @Expose()
  email: string;

  @Expose()
  phone_number: string;

  @Expose()
  work_start_time: string;

  @Expose()
  work_end_time: string;

  @Expose()
  slot_duration_mins: number;

  @Expose()
  charges_per_slot_rupee: number;

  @Type(() => CategoryDto)
  @Expose()
  category: CategoryDto;
}

export class SlotDetailDto {
  @Expose()
  id: number;

  @Expose()
  start_time: Date;

  @Expose()
  end_time: Date;

  @Expose()
  status: string;

  @Expose()
  slot_hold_time: Date;

  @Type(() => ProviderDto)
  @Expose()
  provider: ProviderDto;
}

export class UserDto {
  @Expose() id: number;
  @Expose() first_name: string;
  @Expose() last_name: string;
  @Expose() phone_number: string;
}

export class SlotDto {
  @Expose() id: number;
  @Expose() start_time: string;
  @Expose() end_time: string;
  @Expose() status: string;

  @Expose() slot_hold_time: string;

  @Type(() => ProviderDto)
  @Expose() provider: ProviderDto;
}

export class BookingDetailDto {
  @Expose() id: number;
  @Expose() booking_time: Date;
  @Expose() status: string;

  @Type(() => UserDto)
  @Expose() user: UserDto;

  @Type(() => SlotDto)
  @Expose() slots: SlotDto;
}