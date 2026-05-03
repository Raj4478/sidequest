import { Repository } from 'typeorm';
import { Resolution } from './entities/resolution.entity';
import { CreateResolutionDto, UpdateResolutionDto } from './dto/resolution.dto';
export declare class ResolutionsService {
    private resolutionsRepository;
    constructor(resolutionsRepository: Repository<Resolution>);
    create(userId: string, dto: CreateResolutionDto): Promise<Resolution>;
    findAll(userId: string): Promise<Resolution[]>;
    findOne(id: string, userId: string): Promise<Resolution>;
    update(id: string, userId: string, dto: UpdateResolutionDto): Promise<Resolution>;
    delete(id: string, userId: string): Promise<void>;
    recalculateProgress(resolutionId: string): Promise<void>;
}
