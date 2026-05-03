import {
  IsString, IsDateString, IsOptional, IsInt, Min, MaxLength,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateMilestoneDto {
  @IsString()
  @MaxLength(200)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  due_date: string;

  @IsInt()
  @Min(0)
  order_index: number;
}

export class UpdateMilestoneDto extends PartialType(CreateMilestoneDto) {}
