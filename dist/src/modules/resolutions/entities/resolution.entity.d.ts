import { User } from '../../users/entities/user.entity';
import { Milestone } from '../../milestones/entities/milestone.entity';
export declare enum ResolutionCategory {
    HEALTH = "health",
    CAREER = "career",
    EDUCATION = "education",
    FINANCE = "finance",
    PERSONAL = "personal",
    OTHER = "other"
}
export declare enum ResolutionStatus {
    ACTIVE = "active",
    COMPLETED = "completed",
    ABANDONED = "abandoned"
}
export declare class Resolution {
    id: string;
    user_id: string;
    user: User;
    title: string;
    description: string;
    category: ResolutionCategory;
    start_date: string;
    end_date: string;
    progress_percent: number;
    status: ResolutionStatus;
    milestones: Milestone[];
    created_at: Date;
    updated_at: Date;
}
