import { User } from '../../users/entities/user.entity';
import { Resolution } from '../../resolutions/entities/resolution.entity';
export declare enum ReminderFrequency {
    DAILY = "daily",
    WEEKLY = "weekly",
    MONTHLY = "monthly"
}
export declare class Reminder {
    id: string;
    user_id: string;
    resolution_id: string;
    user: User;
    resolution: Resolution;
    type: string;
    frequency: ReminderFrequency;
    send_time: string;
    is_active: boolean;
    last_sent_at: Date;
    created_at: Date;
}
