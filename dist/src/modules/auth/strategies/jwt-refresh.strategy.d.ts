import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UsersService } from '../../users/users.service';
declare const JwtRefreshStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtRefreshStrategy extends JwtRefreshStrategy_base {
    private configService;
    private usersService;
    constructor(configService: ConfigService, usersService: UsersService);
    validate(req: Request, payload: {
        sub: string;
        email: string;
    }): Promise<{
        refreshToken: string;
        id: string;
        email: string;
        password_hash: string;
        name: string;
        avatar_url: string;
        is_email_verified: boolean;
        refresh_token: string;
        resolutions: import("../../resolutions/entities/resolution.entity").Resolution[];
        reflections: import("../../reflections/entities/reflection.entity").Reflection[];
        reminders: import("../../reminders/entities/reminder.entity").Reminder[];
        created_at: Date;
        updated_at: Date;
    }>;
}
export {};
