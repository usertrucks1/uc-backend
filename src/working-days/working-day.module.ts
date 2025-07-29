import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkingDaySeeder } from './working-day.seeder';
import { WorkingDay } from './working-day.entity';
import { Provider } from 'src/providers/provider.entity';


@Module({
    imports: [TypeOrmModule.forFeature([WorkingDay, Provider])],
    providers: [WorkingDaySeeder],
    controllers: []
})
export class WorkingDaysModule { }
