import {
  Controller, Get, Post, Patch, Delete,
  Param, Body, UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { MilestonesService } from './milestones.service';
import { CreateMilestoneDto, UpdateMilestoneDto } from './dto/milestone.dto';
import { User } from '../users/entities/user.entity';

@Controller()
@UseGuards(JwtAuthGuard)
export class MilestonesController {
  constructor(private milestonesService: MilestonesService) {}

  @Post('resolutions/:resolutionId/milestones')
  create(
    @Param('resolutionId') resolutionId: string,
    @CurrentUser() user: User,
    @Body() dto: CreateMilestoneDto,
  ) {
    return this.milestonesService.create(resolutionId, user.id, dto);
  }

  @Get('resolutions/:resolutionId/milestones')
  findAll(@Param('resolutionId') resolutionId: string, @CurrentUser() user: User) {
    return this.milestonesService.findAll(resolutionId, user.id);
  }

  @Patch('milestones/:id')
  update(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Body() dto: UpdateMilestoneDto,
  ) {
    return this.milestonesService.update(id, user.id, dto);
  }

  @Patch('milestones/:id/complete')
  complete(@Param('id') id: string, @CurrentUser() user: User) {
    return this.milestonesService.complete(id, user.id);
  }

  @Delete('milestones/:id')
  delete(@Param('id') id: string, @CurrentUser() user: User) {
    return this.milestonesService.delete(id, user.id);
  }
}
