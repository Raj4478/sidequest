import {
  IsString, IsEnum, IsDateString, IsOptional, MaxLength,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ResolutionCategory } from '../entities/resolution.entity';

export class CreateResolutionDto {
  @IsString()
  @MaxLength(200)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(ResolutionCategory)
  category: ResolutionCategory;

  @IsDateString()
  start_date: string;

  @IsDateString()
  end_date: string;
}

export class UpdateResolutionDto extends PartialType(CreateResolutionDto) {}
