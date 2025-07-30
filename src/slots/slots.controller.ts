import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { SlotService } from './slots.service';
import { BookingDetailDto, BookSlotDto, GetAvailableSlotsDto, HoldSlotDto, SlotDetailDto, SlotResponseDto } from './slots.dto';
import { plainToInstance } from 'class-transformer';

@Controller('slots')
export class SlotController {
  constructor(private readonly slotService: SlotService) { }

  @Get()
  async getAvailableSlots(@Query() query: GetAvailableSlotsDto) {
    return plainToInstance(SlotResponseDto, this.slotService.getAvailableSlots(query), { excludeExtraneousValues: true });;
  }

  @Post('hold')
  async holdSlot(@Body() dto: HoldSlotDto): Promise<{ message: string; slot: SlotDetailDto }> {
    const slot = await this.slotService.holdSlot(dto);
    const slotDto = plainToInstance(SlotDetailDto, slot, { excludeExtraneousValues: true });

    return {
      message: 'Slot held successfully',
      slot: slotDto,
    };
  }

  @Post(':id/book')
  async bookSlot(
    @Param('id', ParseIntPipe) slotId: number,
    @Body() dto: BookSlotDto,
  ) {
    
    return plainToInstance(BookingDetailDto, this.slotService.bookSlot(slotId, dto), {
    excludeExtraneousValues: true,
  });
  }

}
