import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, ManyToOne, OneToMany, JoinColumn,
} from 'typeorm';
import { Resolution } from '../../resolutions/entities/resolution.entity';
import { Reflection } from '../../reflections/entities/reflection.entity';

export enum MilestoneStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  SKIPPED = 'skipped',
  OVERDUE = 'overdue',
}

@Entity('milestones')
export class Milestone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  resolution_id: string;

  @ManyToOne(() => Resolution, (resolution) => resolution.milestones, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'resolution_id' })
  resolution: Resolution;

  @Column()
  title: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ type: 'date' })
  due_date: string;

  @Column({ type: 'enum', enum: MilestoneStatus, default: MilestoneStatus.PENDING })
  status: MilestoneStatus;

  @Column()
  order_index: number;

  @Column({ nullable: true, type: 'timestamp' })
  completed_at: Date;

  @OneToMany(() => Reflection, (reflection) => reflection.milestone)
  reflections: Reflection[];

  @CreateDateColumn()
  created_at: Date;
}
