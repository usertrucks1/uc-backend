import { Controller, Get, Query } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { GetProvidersQueryDto, ProviderResponseDto } from './provider.dto';
import { plainToInstance } from 'class-transformer';

@Controller('providers')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Get()
  async getAll(@Query() query: GetProvidersQueryDto) {
    const result = await this.providerService.getAllProviders(query);

    return {
      ...result,
      data: result.data.map((p) =>
        plainToInstance(ProviderResponseDto, p, { excludeExtraneousValues: true }),
      ),
    };
  }
}
