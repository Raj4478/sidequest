import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(data: Partial<User>): Promise<User>;
    update(id: string, data: Partial<User>): Promise<User>;
    delete(id: string): Promise<void>;
    updateRefreshToken(id: string, token: string | null): Promise<void>;
    sanitize(user: User): {
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
}
