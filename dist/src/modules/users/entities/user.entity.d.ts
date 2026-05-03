import { Resolution } from '../../resolutions/entities/resolution.entity';
import { Reflection } from '../../reflections/entities/reflection.entity';
import { Reminder } from '../../reminders/entities/reminder.entity';
export declare class User {
    id: string;
    email: string;
    password_hash: string;
    name: string;
    avatar_url: string;
    is_email_verified: boolean;
    refresh_token: string;
    resolutions: Resolution[];
    reflections: Reflection[];
    reminders: Reminder[];
    created_at: Date;
    updated_at: Date;
}
