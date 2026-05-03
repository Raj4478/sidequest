import { Repository } from 'typeorm';
import { Resolution, ResolutionStatus } from '../resolutions/entities/resolution.entity';
import { Milestone } from '../milestones/entities/milestone.entity';
import { Reflection } from '../reflections/entities/reflection.entity';
export declare class DashboardService {
    private resolutionsRepo;
    private milestonesRepo;
    private reflectionsRepo;
    constructor(resolutionsRepo: Repository<Resolution>, milestonesRepo: Repository<Milestone>, reflectionsRepo: Repository<Reflection>);
    getDashboard(userId: string): Promise<{
        hasResolution: boolean;
        resolution?: undefined;
        stats?: undefined;
        upcoming_milestone?: undefined;
        last_reflection?: undefined;
    } | {
        hasResolution: boolean;
        resolution: {
            id: string;
            title: string;
            category: import("../resolutions/entities/resolution.entity").ResolutionCategory;
            progress_percent: number;
            start_date: string;
            end_date: string;
            status: ResolutionStatus;
        };
        stats: {
            days_remaining: number;
            milestones_total: number;
            milestones_completed: number;
            milestones_overdue: number;
        };
        upcoming_milestone: Milestone | null;
        last_reflection: Reflection | null;
    }>;
}
