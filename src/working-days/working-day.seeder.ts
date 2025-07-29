import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkingDay } from './working-day.entity';
import { Repository } from 'typeorm';
import { Provider } from 'src/providers/provider.entity';

@Injectable()
export class WorkingDaySeeder {
  constructor(
    @InjectRepository(WorkingDay)
    private readonly workingDayRepository: Repository<WorkingDay>,

    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    const providers = await this.providerRepository.find();

    for (const provider of providers) {
      const existingDays = await this.workingDayRepository.findOne({
        where: { provider: { id: provider.id } },
      });

      if (!existingDays) {
        const days = this.generateWorkingDays(provider.id);
        await this.workingDayRepository.save(days);
        console.log(`Seeded working days for provider ${provider.id}`);
      } else {
        console.log(`Working days already exist for provider ${provider.id}`);
      }
    }
  }

  private generateWorkingDays(providerId: number): WorkingDay[] {
    const defaultDays = [1, 2, 3, 4, 5, 6, 7]; // Sunday to Thursday

    return defaultDays.map((dayOfWeek) => {
      const day = new WorkingDay();
      day.provider_id = providerId;
      day.day_of_week = dayOfWeek;
      return day;
    });
  }
}
