import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import { Milestone } from '../../milestones/entities/milestone.entity';
import { User } from '../../users/entities/user.entity';

export enum ReflectionMood {
  GREAT = 'great',
  GOOD = 'good',
  OKAY = 'okay',
  STRUGGLING = 'struggling',
}

@Entity('reflections')
export class Reflection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  milestone_id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => Milestone, (milestone) => milestone.reflections, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'milestone_id' })
  milestone: Milestone;

  @ManyToOne(() => User, (user) => user.reflections, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true, type: 'text' })
  wins: string;

  @Column({ nullable: true, type: 'text' })
  blockers: string;

  @Column({ nullable: true, type: 'text' })
  next_steps: string;

  @Column({ type: 'enum', enum: ReflectionMood, nullable: true })
  mood: ReflectionMood;

  @CreateDateColumn()
  created_at: Date;
}
