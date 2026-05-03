import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
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
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
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
    }>;
    refresh(user: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logout(user: any): Promise<{
        message: string;
    }>;
}
