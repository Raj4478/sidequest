import { ReflectionsService } from './reflections.service';
import { CreateReflectionDto, UpdateReflectionDto } from './dto/reflection.dto';
import { User } from '../users/entities/user.entity';
export declare class ReflectionsController {
    private reflectionsService;
    constructor(reflectionsService: ReflectionsService);
    create(milestoneId: string, user: User, dto: CreateReflectionDto): Promise<import("./entities/reflection.entity").Reflection>;
    findByMilestone(milestoneId: string, user: User): Promise<import("./entities/reflection.entity").Reflection[]>;
    findAll(user: User): Promise<import("./entities/reflection.entity").Reflection[]>;
    update(id: string, user: User, dto: UpdateReflectionDto): Promise<import("./entities/reflection.entity").Reflection>;
    delete(id: string, user: User): Promise<void>;
}
