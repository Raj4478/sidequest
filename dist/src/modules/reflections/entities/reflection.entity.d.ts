import { Milestone } from '../../milestones/entities/milestone.entity';
import { User } from '../../users/entities/user.entity';
export declare enum ReflectionMood {
    GREAT = "great",
    GOOD = "good",
    OKAY = "okay",
    STRUGGLING = "struggling"
}
export declare class Reflection {
    id: string;
    milestone_id: string;
    user_id: string;
    milestone: Milestone;
    user: User;
    wins: string;
    blockers: string;
    next_steps: string;
    mood: ReflectionMood;
    created_at: Date;
}
