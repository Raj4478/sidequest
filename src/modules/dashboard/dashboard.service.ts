import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { Resolution, ResolutionStatus } from '../resolutions/entities/resolution.entity';
import { Milestone, MilestoneStatus } from '../milestones/entities/milestone.entity';
import { Reflection } from '../reflections/entities/reflection.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Resolution)
    private resolutionsRepo: Repository<Resolution>,
    @InjectRepository(Milestone)
    private milestonesRepo: Repository<Milestone>,
    @InjectRepository(Reflection)
    private reflectionsRepo: Repository<Reflection>,
  ) {}

  async getDashboard(userId: string) {
    const resolution = await this.resolutionsRepo.findOne({
      where: { user_id: userId, status: ResolutionStatus.ACTIVE },
      relations: ['milestones'],
      order: { created_at: 'DESC' },
    });

    if (!resolution) {
      return { hasResolution: false };
    }

    const today = new Date().toISOString().split('T')[0];
    const endDate = new Date(resolution.end_date);
    const daysRemaining = Math.max(
      0,
      Math.ceil((endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
    );

    const milestones = resolution.milestones.sort((a, b) => a.order_index - b.order_index);
    const completedCount = milestones.filter((m) => m.status === MilestoneStatus.COMPLETED).length;
    const upcomingMilestone = milestones.find(
      (m) => m.status === MilestoneStatus.PENDING && m.due_date >= today,
    );
    const overdueMilestones = milestones.filter(
      (m) => m.status === MilestoneStatus.PENDING && m.due_date < today,
    );

    const lastReflection = await this.reflectionsRepo.findOne({
      where: { user_id: userId },
      order: { created_at: 'DESC' },
    });

    return {
      hasResolution: true,
      resolution: {
        id: resolution.id,
        title: resolution.title,
        category: resolution.category,
        progress_percent: resolution.progress_percent,
        start_date: resolution.start_date,
        end_date: resolution.end_date,
        status: resolution.status,
      },
      stats: {
        days_remaining: daysRemaining,
        milestones_total: milestones.length,
        milestones_completed: completedCount,
        milestones_overdue: overdueMilestones.length,
      },
      upcoming_milestone: upcomingMilestone || null,
      last_reflection: lastReflection || null,
    };
  }
}
