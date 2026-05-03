import { Repository } from 'typeorm';
import { Reflection } from './entities/reflection.entity';
import { CreateReflectionDto, UpdateReflectionDto } from './dto/reflection.dto';
import { MilestonesService } from '../milestones/milestones.service';
export declare class ReflectionsService {
    private reflectionsRepository;
    private milestonesService;
    constructor(reflectionsRepository: Repository<Reflection>, milestonesService: MilestonesService);
    create(milestoneId: string, userId: string, dto: CreateReflectionDto): Promise<Reflection>;
    findByMilestone(milestoneId: string, userId: string): Promise<Reflection[]>;
    findAllByUser(userId: string): Promise<Reflection[]>;
    update(id: string, userId: string, dto: UpdateReflectionDto): Promise<Reflection>;
    delete(id: string, userId: string): Promise<void>;
}
