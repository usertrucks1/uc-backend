import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Slots, SlotStatus } from './slots.entity';
import { BookSlotDto, GetAvailableSlotsDto, HoldSlotDto } from './slots.dto';
import { Booking, BookingStatus } from 'src/bookings/bookings.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class SlotService {
  
constructor(
  @InjectRepository(Slots)
  private readonly slotRepository: Repository<Slots>,

  @InjectRepository(User)
  private readonly userRepository: Repository<User>,

  @InjectRepository(Booking)
  private readonly bookingRepository: Repository<Booking>,
) {}


  async getAvailableSlots(dto: GetAvailableSlotsDto) {
    const { provider_id, start_date } = dto;

    const query = this.slotRepository
      .createQueryBuilder('slots')
      .leftJoinAndSelect('slots.provider', 'provider')
      .andWhere('slots.status = :status', { status: SlotStatus.Available });

    if (provider_id) {
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

  async holdSlot(dto: HoldSlotDto) {
    const slot = await this.slotRepository.findOne({ where: { id: dto.slot_id } });

    if (!slot) {
      throw new NotFoundException('Slot not found');
    }

    if (slot.status !== SlotStatus.Available) {
      throw new BadRequestException('Slot is not available');
    }

    slot.status = SlotStatus.Hold;
    slot.slot_hold_time = new Date();

    await this.slotRepository.save(slot);

    return { message: 'Slot held successfully', slot_id: slot.id };
  }

  async bookSlot(slotId: number, dto: BookSlotDto) {
    const slot = await this.slotRepository.findOne({
      where: { id: slotId },
      relations: ['provider'],
    });

    if (!slot) throw new NotFoundException('Slot not found');
    if (slot.status !== SlotStatus.Hold) {
      throw new BadRequestException('Slot is not in hold state');
    }

    // Check or create user
    let user = await this.userRepository.findOne({
      where: { phone_number: dto.phone_number },
    });

    if (!user) {
      user = this.userRepository.create({
        first_name: dto.first_name,
        last_name: dto.last_name,
        phone_number: dto.phone_number,
      });
      user = await this.userRepository.save(user);
    }

    // Create booking
    const booking = this.bookingRepository.create({
      slots: slot,
      user,
      status: BookingStatus.CONFIRMED,
      booking_time: new Date(),
    });

    await this.bookingRepository.save(booking);

    // Update slot status
    slot.status = SlotStatus.Booked;
    slot.slot_hold_time = null;
    await this.slotRepository.save(slot);

    return {
      message: 'Slot booked successfully',
      slot_id: slot.id,
      booking_id: booking.id,
    };
  }

}
