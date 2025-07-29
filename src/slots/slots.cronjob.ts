import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Provider } from 'src/providers/provider.entity';
import { WorkingDay } from 'src/working-days/working-day.entity';
import * as dayjs from 'dayjs';
import { Slots, SlotStatus } from './slots.entity';

@Injectable()
export class SlotCronJob {
  private readonly logger = new Logger(SlotCronJob.name);

  constructor(
    @InjectRepository(Slots) private readonly slotRepo: Repository<Slots>,
    @InjectRepository(Provider) private readonly providerRepo: Repository<Provider>,
    @InjectRepository(WorkingDay) private readonly workingDayRepo: Repository<WorkingDay>,
  ) { }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async seedSlotsForNext7Days() {
    const providers = await this.providerRepo.find({ where: { is_active: true } });

    const today = dayjs().startOf('day');

    for (const provider of providers) {
      const workingDays = await this.workingDayRepo.find({
        where: { provider_id: provider.id },
      });

      const workingDayNums = workingDays.map(w => w.day_of_week);

      for (let i = 0; i < 7; i++) {
        const date = today.add(i, 'day');
        const dayOfWeek = date.day() === 0 ? 1 : date.day() + 1; // convert 0=Sunday to 1=Sunday, 6=Saturday to 7

        if (!workingDayNums.includes(dayOfWeek)) continue;

        const startTime = dayjs(`${date.format('YYYY-MM-DD')}T${provider.work_start_time}`);
        const endTime = dayjs(`${date.format('YYYY-MM-DD')}T${provider.work_end_time}`);
        const duration = provider.slot_duration_mins;

        const existingSlots = await this.slotRepo.find({
          where: {
            provider: { id: provider.id },
            start_time: Between(startTime.toDate(), endTime.toDate()),
          },
        });

        const generatedSlots: Slots[] = [];

        for (let time = startTime; time.isBefore(endTime); time = time.add(duration, 'minute')) {
          const slotEnd = time.add(duration, 'minute');

          const alreadyExists = existingSlots.some(
            slot => dayjs(slot.start_time).isSame(time)
          );
          if (alreadyExists) continue;

          const newSlot = this.slotRepo.create({
            provider,
            start_time: time.toDate(),
            end_time: slotEnd.toDate(),
            status: SlotStatus.Available,
            slot_hold_time: null,
          });
          generatedSlots.push(newSlot);
        }

        if (generatedSlots.length > 0) {
          await this.slotRepo.save(generatedSlots);
          this.logger.log(`Created ${generatedSlots.length} slots for provider ${provider.id} on ${date.format('YYYY-MM-DD')}`);
        }
      }
    }
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async releaseHeldSlots() {
    const fifteenMinutesAgo = dayjs().subtract(15, 'minute').toDate();

    const heldSlots = await this.slotRepo.find({
      where: {
        status: SlotStatus.Hold,
        slot_hold_time: Between(new Date('1970-01-01T00:00:00Z'), fifteenMinutesAgo),
      },
    });

    if (heldSlots.length === 0) {
      this.logger.log('No held slots to release.');
      return;
    }

    for (const slot of heldSlots) {
      slot.status = SlotStatus.Available;
      slot.slot_hold_time = null;
    }

    await this.slotRepo.save(heldSlots);
    this.logger.log(`Released ${heldSlots.length} held slots back to available`);
  }

}
