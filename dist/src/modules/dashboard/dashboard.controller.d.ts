import { DashboardService } from './dashboard.service';
import { User } from '../users/entities/user.entity';
export declare class DashboardController {
    private dashboardService;
    constructor(dashboardService: DashboardService);
    getDashboard(user: User): Promise<{
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
            status: import("../resolutions/entities/resolution.entity").ResolutionStatus;
        };
        stats: {
            days_remaining: number;
            milestones_total: number;
            milestones_completed: number;
            milestones_overdue: number;
        };
        upcoming_milestone: import("../milestones/entities/milestone.entity").Milestone | null;
        last_reflection: import("../reflections/entities/reflection.entity").Reflection | null;
    }>;
}
