import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reflection } from './entities/reflection.entity';
import { ReflectionsService } from './reflections.service';
import { ReflectionsController } from './reflections.controller';
import { MilestonesModule } from '../milestones/milestones.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reflection]), MilestonesModule],
  providers: [ReflectionsService],
  controllers: [ReflectionsController],
  exports: [ReflectionsService],
})
export class ReflectionsModule {}
