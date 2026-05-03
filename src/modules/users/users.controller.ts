import { Controller, Get, Patch, Delete, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { IsOptional, IsString, MaxLength } from 'class-validator';

class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  avatar_url?: string;
}

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  getMe(@CurrentUser() user: User) {
    return this.usersService.sanitize(user);
  }

  @Patch('me')
  async updateMe(@CurrentUser() user: User, @Body() dto: UpdateUserDto) {
    const updated = await this.usersService.update(user.id, dto);
    return this.usersService.sanitize(updated);
  }

  @Delete('me')
  async deleteMe(@CurrentUser() user: User) {
    await this.usersService.delete(user.id);
    return { message: 'Account deleted successfully' };
  }
}
