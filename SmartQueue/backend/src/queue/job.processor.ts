import { Process, Processor, OnQueueActive, OnQueueCompleted, OnQueueFailed } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job as BullJob } from 'bull';
import { Job, JobStatus, JobType } from '../jobs/entities/job.entity';

@Processor('job-processing')
export class JobProcessor {
  private readonly logger = new Logger(JobProcessor.name);

  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  @Process('process-job')
  async handleJob(bullJob: BullJob) {
    const { jobId, type, payload } = bullJob.data;
    const startTime = Date.now();

    this.logger.log(`Processing job ${jobId} of type ${type}`);

    // Mark as processing
    await this.jobRepository.update(jobId, {
      status: JobStatus.PROCESSING,
      attempts: bullJob.attemptsMade + 1,
    });

    // Simulate different processing logic per job type
    const result = await this.processJobByType(type, payload);

    const processingTime = Date.now() - startTime;

    // Mark as completed
    await this.jobRepository.update(jobId, {
      status: JobStatus.COMPLETED,
      result,
      processingTime,
      completedAt: new Date(),
    });

    this.logger.log(`Job ${jobId} completed in ${processingTime}ms`);
    return result;
  }

  private async processJobByType(type: JobType, payload: any) {
    switch (type) {
      case JobType.DATA_PROCESSING:
        return await this.simulateDataProcessing(payload);
      case JobType.DOCUMENT_PARSING:
        return await this.simulateDocumentParsing(payload);
      case JobType.EMAIL_NOTIFICATION:
        return await this.simulateEmailNotification(payload);
      case JobType.REPORT_GENERATION:
        return await this.simulateReportGeneration(payload);
      case JobType.IMAGE_PROCESSING:
        return await this.simulateImageProcessing(payload);
      default:
        return { processed: true };
    }
  }

  private async simulateDataProcessing(payload: any) {
    const delay = Math.random() * 3000 + 1000; // 1-4 seconds
    await this.sleep(delay);
    const rows = payload?.rows || Math.floor(Math.random() * 10000);
    return {
      rowsProcessed: rows,
      duplicatesRemoved: Math.floor(rows * 0.03),
      validationErrors: Math.floor(rows * 0.001),
      outputFile: `processed_${Date.now()}.csv`,
    };
  }

  private async simulateDocumentParsing(payload: any) {
    const delay = Math.random() * 4000 + 2000; // 2-6 seconds
    await this.sleep(delay);
    return {
      pagesExtracted: Math.floor(Math.random() * 50) + 1,
      tablesFound: Math.floor(Math.random() * 10),
      wordsExtracted: Math.floor(Math.random() * 5000),
      confidence: `${(Math.random() * 10 + 90).toFixed(1)}%`,
    };
  }

  private async simulateEmailNotification(payload: any) {
    const delay = Math.random() * 1000 + 500; // 0.5-1.5 seconds
    await this.sleep(delay);
    return {
      recipientCount: payload?.recipients || 1,
      delivered: true,
      messageId: `msg_${Date.now()}`,
    };
  }

  private async simulateReportGeneration(payload: any) {
    const delay = Math.random() * 5000 + 3000; // 3-8 seconds
    await this.sleep(delay);
    return {
      reportUrl: `https://reports.smartqueue.io/${Date.now()}.pdf`,
      pages: Math.floor(Math.random() * 20) + 5,
      charts: Math.floor(Math.random() * 10),
      generatedAt: new Date().toISOString(),
    };
  }

  private async simulateImageProcessing(payload: any) {
    const delay = Math.random() * 3000 + 1500; // 1.5-4.5 seconds
    await this.sleep(delay);
    return {
      originalSize: `${Math.floor(Math.random() * 5) + 1}MB`,
      processedSize: `${(Math.random() * 0.9 + 0.1).toFixed(1)}MB`,
      compressionRatio: `${Math.floor(Math.random() * 60 + 30)}%`,
      outputUrl: `https://cdn.smartqueue.io/processed_${Date.now()}.webp`,
    };
  }

  @OnQueueActive()
  onActive(job: BullJob) {
    this.logger.debug(`Job ${job.id} is now active`);
  }

  @OnQueueCompleted()
  onCompleted(job: BullJob) {
    this.logger.debug(`Job ${job.id} completed`);
  }

  @OnQueueFailed()
  async onFailed(job: BullJob, error: Error) {
    this.logger.error(`Job ${job.id} failed: ${error.message}`);
    const { jobId } = job.data;

    const isLastAttempt = job.attemptsMade >= job.opts.attempts;

    await this.jobRepository.update(jobId, {
      status: isLastAttempt ? JobStatus.FAILED : JobStatus.RETRYING,
      errorMessage: error.message,
      attempts: job.attemptsMade,
    });
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
