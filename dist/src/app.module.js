"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const schedule_1 = require("@nestjs/schedule");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const resolutions_module_1 = require("./modules/resolutions/resolutions.module");
const milestones_module_1 = require("./modules/milestones/milestones.module");
const reflections_module_1 = require("./modules/reflections/reflections.module");
const email_module_1 = require("./modules/email/email.module");
const dashboard_module_1 = require("./modules/dashboard/dashboard.module");
const user_entity_1 = require("./modules/users/entities/user.entity");
const resolution_entity_1 = require("./modules/resolutions/entities/resolution.entity");
const milestone_entity_1 = require("./modules/milestones/entities/milestone.entity");
const reflection_entity_1 = require("./modules/reflections/entities/reflection.entity");
const reminder_entity_1 = require("./modules/reminders/entities/reminder.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            schedule_1.ScheduleModule.forRoot(),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    type: 'postgres',
                    url: config.get('DATABASE_URL'),
                    entities: [user_entity_1.User, resolution_entity_1.Resolution, milestone_entity_1.Milestone, reflection_entity_1.Reflection, reminder_entity_1.Reminder],
                    synchronize: config.get('NODE_ENV') === 'development',
                    logging: config.get('NODE_ENV') === 'development',
                    ssl: config.get('NODE_ENV') === 'production'
                        ? { rejectUnauthorized: false }
                        : false,
                }),
            }),
            email_module_1.EmailModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            resolutions_module_1.ResolutionsModule,
            milestones_module_1.MilestonesModule,
            reflections_module_1.ReflectionsModule,
            dashboard_module_1.DashboardModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map