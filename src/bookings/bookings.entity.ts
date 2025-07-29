import { Slots } from 'src/slots/slots.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  Unique,
} from 'typeorm';

export enum BookingStatus {
  CONFIRMED = 1,
  CANCELLED = 2,
}

@Entity({ name: 'bookings' })
@Unique(['slots'])
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Slots, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'slot_id' })
  slots: Slots;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'int', default: BookingStatus.CONFIRMED })
  status: BookingStatus;

  @Column({ type: 'timestamp', nullable: false })
  booking_time: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
