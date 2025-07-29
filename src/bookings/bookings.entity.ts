import { Slot } from 'src/slots/slots.entity';
import { User } from 'src/users/user.entity';
import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, JoinColumn,
  OneToOne
} from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Slot)
  @JoinColumn({ name: 'slot_id' })
  slot: Slot;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'int' })
  status: number; // 1: Confirmed, 2: Cancelled

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
