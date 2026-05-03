import {
  Injectable, NotFoundException, ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Milestone, MilestoneStatus } from './entities/milestone.entity';
import { CreateMilestoneDto, UpdateMilestoneDto } from './dto/milestone.dto';
import { ResolutionsService } from '../resolutions/resolutions.service';

@Injectable()
export class MilestonesService {
  constructor(
    @InjectRepository(Milestone)
    private milestonesRepository: Repository<Milestone>,
    private resolutionsService: ResolutionsService,
  ) {}

  async create(resolutionId: string, userId: string, dto: CreateMilestoneDto): Promise<Milestone> {
    await this.resolutionsService.findOne(resolutionId, userId); // ownership check
    const milestone = this.milestonesRepository.create({
      ...dto,
      resolution_id: resolutionId,
    });
    return this.milestonesRepository.save(milestone);
  }

  async findAll(resolutionId: string, userId: string): Promise<Milestone[]> {
    await this.resolutionsService.findOne(resolutionId, userId); // ownership check
    return this.milestonesRepository.find({
      where: { resolution_id: resolutionId },
      order: { order_index: 'ASC' },
    });
  }

  async findOne(id: string, userId: string): Promise<Milestone> {
    const milestone = await this.milestonesRepository.findOne({
      where: { id },
      relations: ['resolution'],
    });
    if (!milestone) throw new NotFoundException('Milestone not found');
    if (milestone.resolution.user_id !== userId) throw new ForbiddenException('Access denied');
    return milestone;
  }

  async update(id: string, userId: string, dto: UpdateMilestoneDto): Promise<Milestone> {
    const milestone = await this.findOne(id, userId);
    Object.assign(milestone, dto);
    return this.milestonesRepository.save(milestone);
  }

  async complete(id: string, userId: string): Promise<Milestone> {
    const milestone = await this.findOne(id, userId);
    milestone.status = MilestoneStatus.COMPLETED;
    milestone.completed_at = new Date();
    const saved = await this.milestonesRepository.save(milestone);
    await this.resolutionsService.recalculateProgress(milestone.resolution_id);
    return saved;
  }

  async delete(id: string, userId: string): Promise<void> {
    const milestone = await this.findOne(id, userId);
    await this.milestonesRepository.delete(milestone.id);
    await this.resolutionsService.recalculateProgress(milestone.resolution_id);
  }
}
