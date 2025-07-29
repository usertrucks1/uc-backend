import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Slots } from "./slots.entity";
import { Provider } from "src/providers/provider.entity";
import { WorkingDay } from "src/working-days/working-day.entity";
import { SlotCronJob } from "./slots.cronjob";
import { SlotService } from "./slots.service";
import { SlotController } from "./slots.controller";
import { User } from "src/users/user.entity";
import { Booking } from "src/bookings/bookings.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Slots, Provider, WorkingDay, User, Booking])
  ],
  providers: [SlotCronJob, SlotService],
  controllers: [SlotController],
})
export class SlotsModule { }
