import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobProcessor } from './job.processor';
import { QueueController } from './queue.controller';
import { Job } from '../jobs/entities/job.entity';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'job-processing' }),
    TypeOrmModule.forFeature([Job]),
  ],
  controllers: [QueueController],
  providers: [JobProcessor],
  exports: [BullModule],
})
export class QueueModule {}
