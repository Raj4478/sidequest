import { Controller, Get, UseGuards } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('queue')
@Controller('queue')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class QueueController {
  constructor(
    @InjectQueue('job-processing')
    private readonly jobQueue: Queue,
  ) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get live queue statistics from Bull/Redis' })
  async getQueueStats() {
    const [waiting, active, completed, failed, delayed] = await Promise.all([
      this.jobQueue.getWaitingCount(),
      this.jobQueue.getActiveCount(),
      this.jobQueue.getCompletedCount(),
      this.jobQueue.getFailedCount(),
      this.jobQueue.getDelayedCount(),
    ]);

    return {
      waiting,
      active,
      completed,
      failed,
      delayed,
      total: waiting + active + completed + failed + delayed,
    };
  }
}
