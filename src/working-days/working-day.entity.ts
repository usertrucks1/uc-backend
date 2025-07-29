import { Provider } from 'src/providers/provider.entity';
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne,
  CreateDateColumn, UpdateDateColumn, JoinColumn
} from 'typeorm';

@Entity('working_days')
export class WorkingDay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  provider_id: number;

  @ManyToOne(() => Provider, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;

  @Column({
    type: 'int',
    comment: '1 (Sunday) to 7 (Saturday)',
  })
  day_of_week: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
