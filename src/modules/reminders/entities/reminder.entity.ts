import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Resolution } from '../../resolutions/entities/resolution.entity';

export enum ReminderFrequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

@Entity('reminders')
export class Reminder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  resolution_id: string;

  @ManyToOne(() => User, (user) => user.reminders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Resolution, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'resolution_id' })
  resolution: Resolution;

  @Column({ default: 'email' })
  type: string;

  @Column({ type: 'enum', enum: ReminderFrequency, default: ReminderFrequency.WEEKLY })
  frequency: ReminderFrequency;

  @Column({ type: 'time', default: '09:00' })
  send_time: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ nullable: true, type: 'timestamp' })
  last_sent_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
