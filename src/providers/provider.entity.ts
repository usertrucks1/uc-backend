import { Exclude } from 'class-transformer';
import { Category } from 'src/category/category.entity';
import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, JoinColumn,
  OneToOne, Unique
} from 'typeorm';

@Entity({ name: 'providers' })
@Unique(['email'])
export class Provider {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  first_name: string;

  @Column({ type: 'varchar', length: 50 })
  last_name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 15 })
  phone_number: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password_hash: string;

  @OneToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ type: 'time' })
  work_start_time: string;

  @Column({ type: 'time' })
  work_end_time: string;

  @Column({ type: 'int', unsigned: true })
  slot_duration_mins: number;

  @Column({ type: 'int', unsigned: true })
  charges_per_slot_rupee: number;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
