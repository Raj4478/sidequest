import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { CreateJobDto, JobFilterDto } from './dto/job.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('jobs')
@Controller('jobs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @ApiOperation({ summary: 'Submit a new job to the queue' })
  create(@Body() dto: CreateJobDto, @Request() req) {
    return this.jobsService.create(dto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all jobs with optional filters' })
  findAll(@Request() req, @Query() filters: JobFilterDto) {
    return this.jobsService.findAll(req.user.id, filters);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get job statistics for dashboard' })
  getStats(@Request() req) {
    return this.jobsService.getStats(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific job by ID' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.jobsService.findOne(id, req.user.id);
  }

  @Post(':id/retry')
  @ApiOperation({ summary: 'Retry a failed job' })
  retry(@Param('id') id: string, @Request() req) {
    return this.jobsService.retryJob(id, req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a job' })
  delete(@Param('id') id: string, @Request() req) {
    return this.jobsService.deleteJob(id, req.user.id);
  }
}
