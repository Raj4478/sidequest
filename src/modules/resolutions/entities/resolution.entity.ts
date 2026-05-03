import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Milestone } from '../../milestones/entities/milestone.entity';

export enum ResolutionCategory {
  HEALTH = 'health',
  CAREER = 'career',
  EDUCATION = 'education',
  FINANCE = 'finance',
  PERSONAL = 'personal',
  OTHER = 'other',
}

export enum ResolutionStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  ABANDONED = 'abandoned',
}

@Entity('resolutions')
export class Resolution {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, (user) => user.resolutions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  title: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: ResolutionCategory })
  category: ResolutionCategory;

  @Column({ type: 'date' })
  start_date: string;

  @Column({ type: 'date' })
  end_date: string;

  @Column({ default: 0 })
  progress_percent: number;

  @Column({ type: 'enum', enum: ResolutionStatus, default: ResolutionStatus.ACTIVE })
  status: ResolutionStatus;

  @OneToMany(() => Milestone, (milestone) => milestone.resolution)
  milestones: Milestone[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
