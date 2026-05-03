import { Resolution } from '../../resolutions/entities/resolution.entity';
import { Reflection } from '../../reflections/entities/reflection.entity';
export declare enum MilestoneStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    SKIPPED = "skipped",
    OVERDUE = "overdue"
}
export declare class Milestone {
    id: string;
    resolution_id: string;
    resolution: Resolution;
    title: string;
    description: string;
    due_date: string;
    status: MilestoneStatus;
    order_index: number;
    completed_at: Date;
    reflections: Reflection[];
    created_at: Date;
}
