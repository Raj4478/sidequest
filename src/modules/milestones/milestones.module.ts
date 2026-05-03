import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Milestone } from './entities/milestone.entity';
import { MilestonesService } from './milestones.service';
import { MilestonesController } from './milestones.controller';
import { ResolutionsModule } from '../resolutions/resolutions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Milestone]), ResolutionsModule],
  providers: [MilestonesService],
  controllers: [MilestonesController],
  exports: [MilestonesService],
})
export class MilestonesModule {}
