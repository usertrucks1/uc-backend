import { Controller, Get, Query } from '@nestjs/common';
import { SlotService } from './slots.service';
import { GetAvailableSlotsDto, SlotResponseDto } from './slots.dto';
import { plainToInstance } from 'class-transformer';

@Controller('slots')
export class SlotController {
  constructor(private readonly slotService: SlotService) {}

  @Get()
  async getAvailableSlots(@Query() query: GetAvailableSlotsDto) {
    return plainToInstance(SlotResponseDto, this.slotService.getAvailableSlots(query), { excludeExtraneousValues: true });;
  }
}
