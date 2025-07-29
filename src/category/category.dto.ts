import { IsOptional, IsInt, IsString, Min, MaxLength } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class GetCategoriesQueryDto {
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
