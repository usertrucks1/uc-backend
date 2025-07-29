import { Provider } from 'src/providers/provider.entity';
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne,
  CreateDateColumn, UpdateDateColumn, JoinColumn
} from 'typeorm';

export enum SlotStatus {
  Unavailable = 1,
  Available = 2,
  Hold = 3,
  Booked = 4,
}
@Entity({ name: 'slots' })
export class Slots {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Provider, provider => provider.slots)
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;

  @Column({ type: 'timestamp' })
  start_time: Date;

  @Column({ type: 'timestamp' })
  end_time: Date;

  @Column({ type: 'int', default: SlotStatus.Available })
  status: SlotStatus;

  @Column({ nullable: true, type: 'timestamp' })
  slot_hold_time: Date | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
