import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ResolutionsModule } from './modules/resolutions/resolutions.module';
import { MilestonesModule } from './modules/milestones/milestones.module';
import { ReflectionsModule } from './modules/reflections/reflections.module';
import { EmailModule } from './modules/email/email.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

import { User } from './modules/users/entities/user.entity';
import { Resolution } from './modules/resolutions/entities/resolution.entity';
import { Milestone } from './modules/milestones/entities/milestone.entity';
import { Reflection } from './modules/reflections/entities/reflection.entity';
import { Reminder } from './modules/reminders/entities/reminder.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        entities: [User, Resolution, Milestone, Reflection, Reminder],
        synchronize: config.get<string>('NODE_ENV') === 'development',
        logging: config.get<string>('NODE_ENV') === 'development',
        ssl: config.get<string>('NODE_ENV') === 'production'
          ? { rejectUnauthorized: false }
          : false,
      }),
    }),
    EmailModule,
    AuthModule,
    UsersModule,
    ResolutionsModule,
    MilestonesModule,
    ReflectionsModule,
    DashboardModule,
  ],
})
export class AppModule {}
