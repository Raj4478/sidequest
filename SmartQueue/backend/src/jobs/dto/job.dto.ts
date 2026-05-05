import {
  IsString,
  IsEnum,
  IsOptional,
  IsObject,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { JobType } from '../entities/job.entity';

export class CreateJobDto {
  @ApiProperty({ example: 'Process Q4 Sales Report' })
  @IsString()
  name: string;

  @ApiProperty({ enum: JobType, example: JobType.DATA_PROCESSING })
  @IsEnum(JobType)
  type: JobType;

  @ApiPropertyOptional({ example: { fileUrl: 'https://...', rows: 5000 } })
  @IsOptional()
  @IsObject()
  payload?: Record<string, any>;

  @ApiPropertyOptional({ example: 1, description: '1=highest, 10=lowest' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  priority?: number;
}

export class JobFilterDto {
  @ApiPropertyOptional({ enum: ['pending', 'processing', 'completed', 'failed', 'retrying'] })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ enum: JobType })
  @IsOptional()
  @IsEnum(JobType)
  type?: JobType;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsNumber()
  limit?: number;
}
