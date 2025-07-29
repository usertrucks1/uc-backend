import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Slots, SlotStatus } from './slots.entity';
import { GetAvailableSlotsDto } from './slots.dto';

@Injectable()
export class SlotService {
  constructor(
    @InjectRepository(Slots)
    private readonly slotRepository: Repository<Slots>,
  ) {}

  async getAvailableSlots(dto: GetAvailableSlotsDto) {
    const { provider_id, start_date } = dto;

    const query = this.slotRepository
      .createQueryBuilder('slots')
      .leftJoinAndSelect('slots.provider', 'provider')
      .andWhere('slots.status = :status', { status: SlotStatus.Available });

    if (provider_id){
      query.andWhere('provider.id = :provider_id', { provider_id })
    }

    if (start_date) {
      const startDate = new Date(start_date);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      endDate.setHours(0, 0, 0, 0);
    
      query.andWhere('slots.start_time >= :startDate', { startDate });
      query.andWhere('slots.start_time < :endDate', { endDate });
    }

    query.orderBy('slots.start_time', 'ASC');

    return await query.getMany();
  }
}
