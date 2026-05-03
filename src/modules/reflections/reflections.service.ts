import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reflection } from './entities/reflection.entity';
import { CreateReflectionDto, UpdateReflectionDto } from './dto/reflection.dto';
import { MilestonesService } from '../milestones/milestones.service';

@Injectable()
export class ReflectionsService {
  constructor(
    @InjectRepository(Reflection)
    private reflectionsRepository: Repository<Reflection>,
    private milestonesService: MilestonesService,
  ) {}

  async create(milestoneId: string, userId: string, dto: CreateReflectionDto): Promise<Reflection> {
    await this.milestonesService.findOne(milestoneId, userId); // ownership check
    const reflection = this.reflectionsRepository.create({
      ...dto,
      milestone_id: milestoneId,
      user_id: userId,
    });
    return this.reflectionsRepository.save(reflection);
  }

  async findByMilestone(milestoneId: string, userId: string): Promise<Reflection[]> {
    await this.milestonesService.findOne(milestoneId, userId); // ownership check
    return this.reflectionsRepository.find({
      where: { milestone_id: milestoneId },
      order: { created_at: 'DESC' },
    });
  }

  async findAllByUser(userId: string): Promise<Reflection[]> {
    return this.reflectionsRepository.find({
      where: { user_id: userId },
      relations: ['milestone'],
      order: { created_at: 'DESC' },
    });
  }

  async update(id: string, userId: string, dto: UpdateReflectionDto): Promise<Reflection> {
    const reflection = await this.reflectionsRepository.findOne({ where: { id } });
    if (!reflection) throw new NotFoundException('Reflection not found');
    if (reflection.user_id !== userId) throw new ForbiddenException('Access denied');
    Object.assign(reflection, dto);
    return this.reflectionsRepository.save(reflection);
  }

  async delete(id: string, userId: string): Promise<void> {
    const reflection = await this.reflectionsRepository.findOne({ where: { id } });
    if (!reflection) throw new NotFoundException('Reflection not found');
    if (reflection.user_id !== userId) throw new ForbiddenException('Access denied');
    await this.reflectionsRepository.delete(id);
  }
}
