import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Unique, OneToMany } from 'typeorm';
import { Category } from 'src/category/category.entity';
import { Exclude } from 'class-transformer';
import { Slots } from 'src/slots/slots.entity';

@Entity({ name: 'providers' })
@Unique(["email"])
export class Provider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: false })
  last_name: string;

  @Column({ nullable: false })
  email: string;

  @Column()
  phone_number: string;
  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password_hash: string;
  @ManyToOne(() => Category, (category) => category.providers, { eager: false })
  @JoinColumn({ name: 'category_id' })
  category: Category;
  @Column({ type: 'time' })
  work_start_time: string;

  @Column({ type: 'time' })
  work_end_time: string;

  @Column()
  slot_duration_mins: number;

  @Column()
  charges_per_slot_rupee: number;

    @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Slots, slot => slot.provider)
  slots: Slots[];
}
