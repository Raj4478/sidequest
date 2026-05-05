import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Job, JobStatus } from './entities/job.entity';
import { CreateJobDto, JobFilterDto } from './dto/job.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
    @InjectQueue('job-processing')
    private readonly jobQueue: Queue,
  ) {}

  async create(dto: CreateJobDto, userId: string) {
    // Save to DB first
    const job = this.jobRepository.create({
      ...dto,
      userId,
      status: JobStatus.PENDING,
    });
    await this.jobRepository.save(job);

    // Add to Bull queue
    const bullJob = await this.jobQueue.add(
      'process-job',
      { jobId: job.id, type: job.type, payload: job.payload },
      {
        priority: dto.priority || 5,
        attempts: 3,
        backoff: { type: 'exponential', delay: 2000 },
        jobId: job.id,
      },
    );

    // Store Bull job ID reference
    await this.jobRepository.update(job.id, { bullJobId: String(bullJob.id) });

    return { ...job, bullJobId: String(bullJob.id) };
  }

  async findAll(userId: string, filters: JobFilterDto) {
    const { status, type, page = 1, limit = 10 } = filters;

    const query = this.jobRepository
      .createQueryBuilder('job')
      .where('job.userId = :userId', { userId })
      .orderBy('job.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (status) query.andWhere('job.status = :status', { status });
    if (type) query.andWhere('job.type = :type', { type });

    const [jobs, total] = await query.getManyAndCount();

    return {
      data: jobs,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string, userId: string) {
    const job = await this.jobRepository.findOne({
      where: { id, userId },
    });
    if (!job) throw new NotFoundException('Job not found');
    return job;
  }

  async getStats(userId: string) {
    const stats = await this.jobRepository
      .createQueryBuilder('job')
      .select('job.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .where('job.userId = :userId', { userId })
      .groupBy('job.status')
      .getRawMany();

    const avgProcessingTime = await this.jobRepository
      .createQueryBuilder('job')
      .select('AVG(job.processingTime)', 'avg')
      .where('job.userId = :userId', { userId })
      .andWhere('job.status = :status', { status: JobStatus.COMPLETED })
      .getRawOne();

    const statusMap = {
      pending: 0,
      processing: 0,
      completed: 0,
      failed: 0,
      retrying: 0,
    };

    stats.forEach((s) => {
      statusMap[s.status] = parseInt(s.count);
    });

    const total = Object.values(statusMap).reduce((a, b) => a + b, 0);
    const successRate =
      total > 0 ? ((statusMap.completed / total) * 100).toFixed(1) : '0';

    return {
      ...statusMap,
      total,
      successRate: `${successRate}%`,
      avgProcessingTime: avgProcessingTime?.avg
        ? `${Math.round(avgProcessingTime.avg)}ms`
        : 'N/A',
    };
  }

  async retryJob(id: string, userId: string) {
    const job = await this.findOne(id, userId);
    if (job.status !== JobStatus.FAILED) {
      throw new Error('Only failed jobs can be retried');
    }

    await this.jobRepository.update(id, {
      status: JobStatus.PENDING,
      errorMessage: null,
    });

    await this.jobQueue.add(
      'process-job',
      { jobId: job.id, type: job.type, payload: job.payload },
      { priority: job.priority || 5, attempts: 3 },
    );

    return { message: 'Job queued for retry', jobId: id };
  }

  async deleteJob(id: string, userId: string) {
    const job = await this.findOne(id, userId);
    await this.jobRepository.remove(job);
    return { message: 'Job deleted successfully' };
  }
}
