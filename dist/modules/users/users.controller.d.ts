import { UsersService } from './users.service';
import { User } from './entities/user.entity';
declare class UpdateUserDto {
    name?: string;
    avatar_url?: string;
}
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getMe(user: User): {
        id: string;
        email: string;
        name: string;
        avatar_url: string;
        is_email_verified: boolean;
        resolutions: import("../resolutions/entities/resolution.entity").Resolution[];
        reflections: import("../reflections/entities/reflection.entity").Reflection[];
        reminders: import("../reminders/entities/reminder.entity").Reminder[];
        created_at: Date;
        updated_at: Date;
    };
    updateMe(user: User, dto: UpdateUserDto): Promise<{
        id: string;
        email: string;
        name: string;
        avatar_url: string;
        is_email_verified: boolean;
        resolutions: import("../resolutions/entities/resolution.entity").Resolution[];
        reflections: import("../reflections/entities/reflection.entity").Reflection[];
        reminders: import("../reminders/entities/reminder.entity").Reminder[];
        created_at: Date;
        updated_at: Date;
    }>;
    deleteMe(user: User): Promise<{
        message: string;
    }>;
}
export {};
