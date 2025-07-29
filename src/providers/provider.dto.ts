import { Expose, Type } from 'class-transformer';
import { IsOptional, IsInt, IsString, Min, MaxLength } from 'class-validator';

export class GetProvidersQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  search?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;
}

export class CategoryResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}

export class ProviderResponseDto {
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

  @Expose()
  @Type(() => CategoryResponseDto)
  category: CategoryResponseDto;
}

