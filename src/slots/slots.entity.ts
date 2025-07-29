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
export class Slot {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Provider, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;

  @Column({ type: 'timestamp' })
  start_time: Date;

  @Column({ type: 'timestamp' })
  end_time: Date;

  @Column({ type: 'int' })
  status: SlotStatus;

  @Column({ type: 'timestamp', nullable: true })
  slot_hold_time: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
