import {
  Controller, Get, Post, Patch, Delete,
  Param, Body, UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ReflectionsService } from './reflections.service';
import { CreateReflectionDto, UpdateReflectionDto } from './dto/reflection.dto';
import { User } from '../users/entities/user.entity';

@Controller()
@UseGuards(JwtAuthGuard)
export class ReflectionsController {
  constructor(private reflectionsService: ReflectionsService) {}

  @Post('milestones/:milestoneId/reflections')
  create(
    @Param('milestoneId') milestoneId: string,
    @CurrentUser() user: User,
    @Body() dto: CreateReflectionDto,
  ) {
    return this.reflectionsService.create(milestoneId, user.id, dto);
  }

  @Get('milestones/:milestoneId/reflections')
  findByMilestone(@Param('milestoneId') milestoneId: string, @CurrentUser() user: User) {
    return this.reflectionsService.findByMilestone(milestoneId, user.id);
  }

  @Get('reflections')
  findAll(@CurrentUser() user: User) {
    return this.reflectionsService.findAllByUser(user.id);
  }

  @Patch('reflections/:id')
  update(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Body() dto: UpdateReflectionDto,
  ) {
    return this.reflectionsService.update(id, user.id, dto);
  }

  @Delete('reflections/:id')
  delete(@Param('id') id: string, @CurrentUser() user: User) {
    return this.reflectionsService.delete(id, user.id);
  }
}
