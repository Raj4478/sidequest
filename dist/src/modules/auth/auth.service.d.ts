import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    private configService;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService);
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
    refresh(userId: string, email: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logout(userId: string): Promise<{
        message: string;
    }>;
    private generateTokens;
}
