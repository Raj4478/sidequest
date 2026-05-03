import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, OneToMany,
} from 'typeorm';
import { Resolution } from '../../resolutions/entities/resolution.entity';
import { Reflection } from '../../reflections/entities/reflection.entity';
import { Reminder } from '../../reminders/entities/reminder.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  avatar_url: string;

  @Column({ default: false })
  is_email_verified: boolean;

  @Column({ nullable: true, type: 'text' })
  refresh_token: string;

  @OneToMany(() => Resolution, (resolution) => resolution.user)
  resolutions: Resolution[];

  @OneToMany(() => Reflection, (reflection) => reflection.user)
  reflections: Reflection[];

  @OneToMany(() => Reminder, (reminder) => reminder.user)
  reminders: Reminder[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
