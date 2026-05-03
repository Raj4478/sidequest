import {
  Injectable, NotFoundException, ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resolution } from './entities/resolution.entity';
import { CreateResolutionDto, UpdateResolutionDto } from './dto/resolution.dto';

@Injectable()
export class ResolutionsService {
  constructor(
    @InjectRepository(Resolution)
    private resolutionsRepository: Repository<Resolution>,
  ) {}

  async create(userId: string, dto: CreateResolutionDto): Promise<Resolution> {
    const resolution = this.resolutionsRepository.create({
      ...dto,
      user_id: userId,
    });
    return this.resolutionsRepository.save(resolution);
  }

  async findAll(userId: string): Promise<Resolution[]> {
    return this.resolutionsRepository.find({
      where: { user_id: userId },
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: string, userId: string): Promise<Resolution> {
    const resolution = await this.resolutionsRepository.findOne({
      where: { id },
      relations: ['milestones'],
      order: { milestones: { order_index: 'ASC' } },
    });
    if (!resolution) throw new NotFoundException('Resolution not found');
    if (resolution.user_id !== userId) throw new ForbiddenException('Access denied');
    return resolution;
  }

  async update(id: string, userId: string, dto: UpdateResolutionDto): Promise<Resolution> {
    const resolution = await this.findOne(id, userId);
    Object.assign(resolution, dto);
    return this.resolutionsRepository.save(resolution);
  }

  async delete(id: string, userId: string): Promise<void> {
    const resolution = await this.findOne(id, userId);
    await this.resolutionsRepository.delete(resolution.id);
  }

  async recalculateProgress(resolutionId: string): Promise<void> {
    const resolution = await this.resolutionsRepository.findOne({
      where: { id: resolutionId },
      relations: ['milestones'],
    });
    if (!resolution || !resolution.milestones.length) return;

    const total = resolution.milestones.length;
    const completed = resolution.milestones.filter(
      (m) => m.status === 'completed',
    ).length;

    const progress_percent = Math.round((completed / total) * 100);
    await this.resolutionsRepository.update(resolutionId, { progress_percent });
  }
}
