import { MilestonesService } from './milestones.service';
import { CreateMilestoneDto, UpdateMilestoneDto } from './dto/milestone.dto';
import { User } from '../users/entities/user.entity';
export declare class MilestonesController {
    private milestonesService;
    constructor(milestonesService: MilestonesService);
    create(resolutionId: string, user: User, dto: CreateMilestoneDto): Promise<import("./entities/milestone.entity").Milestone>;
    findAll(resolutionId: string, user: User): Promise<import("./entities/milestone.entity").Milestone[]>;
    update(id: string, user: User, dto: UpdateMilestoneDto): Promise<import("./entities/milestone.entity").Milestone>;
    complete(id: string, user: User): Promise<import("./entities/milestone.entity").Milestone>;
    delete(id: string, user: User): Promise<void>;
}
