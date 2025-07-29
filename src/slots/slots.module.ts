import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Slots } from "./slots.entity";
import { Provider } from "src/providers/provider.entity";
import { WorkingDay } from "src/working-days/working-day.entity";
import { ProviderModule } from "src/providers/provider.module";
import { SlotCronJob } from "./slots.cronjob";
import { SlotService } from "./slots.service";
import { SlotController } from "./slots.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Slots, Provider, WorkingDay]),
    ProviderModule,
  ],
  providers: [SlotCronJob, SlotService],
  controllers: [SlotController]
})
export class SlotsModule {}
