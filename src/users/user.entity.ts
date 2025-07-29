import {
  Column, Entity, PrimaryGeneratedColumn,
  CreateDateColumn, UpdateDateColumn, Index
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  first_name: string;

  @Column({ length: 100 })
  last_name: string;

  @Column({ unique: true, length: 150 })
  email: string;

  @Column({ unique: true, length: 15 })
  phone_number: string;

  @Column()
  password_hash: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
