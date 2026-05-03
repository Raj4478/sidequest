import {
  Controller, Get, Post, Patch, Delete,
  Param, Body, UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ResolutionsService } from './resolutions.service';
import { CreateResolutionDto, UpdateResolutionDto } from './dto/resolution.dto';
import { User } from '../users/entities/user.entity';

@Controller('resolutions')
@UseGuards(JwtAuthGuard)
export class ResolutionsController {
  constructor(private resolutionsService: ResolutionsService) {}

  @Post()
  create(@CurrentUser() user: User, @Body() dto: CreateResolutionDto) {
    return this.resolutionsService.create(user.id, dto);
  }

  @Get()
  findAll(@CurrentUser() user: User) {
    return this.resolutionsService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.resolutionsService.findOne(id, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Body() dto: UpdateResolutionDto,
  ) {
    return this.resolutionsService.update(id, user.id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @CurrentUser() user: User) {
    return this.resolutionsService.delete(id, user.id);
  }
}
