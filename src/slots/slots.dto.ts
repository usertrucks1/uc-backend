import { Expose, Transform } from 'class-transformer';
import { IsDateString, IsNumber } from 'class-validator';

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

