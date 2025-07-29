import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { SlotService } from './slots.service';
import { BookSlotDto, GetAvailableSlotsDto, HoldSlotDto, SlotResponseDto } from './slots.dto';
import { plainToInstance } from 'class-transformer';

@Controller('slots')
export class SlotController {
  constructor(private readonly slotService: SlotService) { }

  @Get()
  async getAvailableSlots(@Query() query: GetAvailableSlotsDto) {
    return plainToInstance(SlotResponseDto, this.slotService.getAvailableSlots(query), { excludeExtraneousValues: true });;
  }

  @Post('hold')
  async holdSlot(@Body() dto: HoldSlotDto) {
    return this.slotService.holdSlot(dto);
  }

  @Post(':id/book')
  async bookSlot(
    @Param('id', ParseIntPipe) slotId: number,
    @Body() dto: BookSlotDto,
  ) {
    return this.slotService.bookSlot(slotId, dto);
  }

}
