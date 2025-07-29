import { Provider } from 'src/providers/provider.entity';
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne,
  CreateDateColumn, UpdateDateColumn, JoinColumn
} from 'typeorm';

@Entity()
export class WorkingDay {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Provider)
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;

  @Column()
  day_of_week: number; // 1 to 7

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
