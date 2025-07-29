import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkingDaySeeder } from './working-day.seeder';
import { WorkingDay } from './working-day.entity';
import { ProviderModule } from 'src/providers/provider.module';


@Module({
    imports: [TypeOrmModule.forFeature([WorkingDay]), ProviderModule],
    providers: [WorkingDaySeeder],
    controllers: []
})
export class WorkingDaysModule { }
