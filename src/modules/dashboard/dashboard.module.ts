import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resolution } from '../resolutions/entities/resolution.entity';
import { Milestone } from '../milestones/entities/milestone.entity';
import { Reflection } from '../reflections/entities/reflection.entity';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Resolution, Milestone, Reflection])],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
