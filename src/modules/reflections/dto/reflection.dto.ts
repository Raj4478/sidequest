import { IsOptional, IsString, IsEnum } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ReflectionMood } from '../entities/reflection.entity';

export class CreateReflectionDto {
  @IsOptional()
  @IsString()
  wins?: string;

  @IsOptional()
  @IsString()
  blockers?: string;

  @IsOptional()
  @IsString()
  next_steps?: string;

  @IsOptional()
  @IsEnum(ReflectionMood)
  mood?: ReflectionMood;
}

export class UpdateReflectionDto extends PartialType(CreateReflectionDto) {}
