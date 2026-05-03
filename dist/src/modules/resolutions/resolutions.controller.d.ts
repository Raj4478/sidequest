import { ResolutionsService } from './resolutions.service';
import { CreateResolutionDto, UpdateResolutionDto } from './dto/resolution.dto';
import { User } from '../users/entities/user.entity';
export declare class ResolutionsController {
    private resolutionsService;
    constructor(resolutionsService: ResolutionsService);
    create(user: User, dto: CreateResolutionDto): Promise<import("./entities/resolution.entity").Resolution>;
    findAll(user: User): Promise<import("./entities/resolution.entity").Resolution[]>;
    findOne(id: string, user: User): Promise<import("./entities/resolution.entity").Resolution>;
    update(id: string, user: User, dto: UpdateResolutionDto): Promise<import("./entities/resolution.entity").Resolution>;
    delete(id: string, user: User): Promise<void>;
}
