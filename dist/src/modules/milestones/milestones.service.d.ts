import { Repository } from 'typeorm';
import { Milestone } from './entities/milestone.entity';
import { CreateMilestoneDto, UpdateMilestoneDto } from './dto/milestone.dto';
import { ResolutionsService } from '../resolutions/resolutions.service';
export declare class MilestonesService {
    private milestonesRepository;
    private resolutionsService;
    constructor(milestonesRepository: Repository<Milestone>, resolutionsService: ResolutionsService);
    create(resolutionId: string, userId: string, dto: CreateMilestoneDto): Promise<Milestone>;
    findAll(resolutionId: string, userId: string): Promise<Milestone[]>;
    findOne(id: string, userId: string): Promise<Milestone>;
    update(id: string, userId: string, dto: UpdateMilestoneDto): Promise<Milestone>;
    complete(id: string, userId: string): Promise<Milestone>;
    delete(id: string, userId: string): Promise<void>;
}
