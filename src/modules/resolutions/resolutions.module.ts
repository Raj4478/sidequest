import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resolution } from './entities/resolution.entity';
import { ResolutionsService } from './resolutions.service';
import { ResolutionsController } from './resolutions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Resolution])],
  providers: [ResolutionsService],
  controllers: [ResolutionsController],
  exports: [ResolutionsService],
})
export class ResolutionsModule {}
