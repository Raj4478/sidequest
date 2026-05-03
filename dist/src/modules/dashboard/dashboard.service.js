"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const resolution_entity_1 = require("../resolutions/entities/resolution.entity");
const milestone_entity_1 = require("../milestones/entities/milestone.entity");
const reflection_entity_1 = require("../reflections/entities/reflection.entity");
let DashboardService = class DashboardService {
    resolutionsRepo;
    milestonesRepo;
    reflectionsRepo;
    constructor(resolutionsRepo, milestonesRepo, reflectionsRepo) {
        this.resolutionsRepo = resolutionsRepo;
        this.milestonesRepo = milestonesRepo;
        this.reflectionsRepo = reflectionsRepo;
    }
    async getDashboard(userId) {
        const resolution = await this.resolutionsRepo.findOne({
            where: { user_id: userId, status: resolution_entity_1.ResolutionStatus.ACTIVE },
            relations: ['milestones'],
            order: { created_at: 'DESC' },
        });
        if (!resolution) {
            return { hasResolution: false };
        }
        const today = new Date().toISOString().split('T')[0];
        const endDate = new Date(resolution.end_date);
        const daysRemaining = Math.max(0, Math.ceil((endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));
        const milestones = resolution.milestones.sort((a, b) => a.order_index - b.order_index);
        const completedCount = milestones.filter((m) => m.status === milestone_entity_1.MilestoneStatus.COMPLETED).length;
        const upcomingMilestone = milestones.find((m) => m.status === milestone_entity_1.MilestoneStatus.PENDING && m.due_date >= today);
        const overdueMilestones = milestones.filter((m) => m.status === milestone_entity_1.MilestoneStatus.PENDING && m.due_date < today);
        const lastReflection = await this.reflectionsRepo.findOne({
            where: { user_id: userId },
            order: { created_at: 'DESC' },
        });
        return {
            hasResolution: true,
            resolution: {
                id: resolution.id,
                title: resolution.title,
                category: resolution.category,
                progress_percent: resolution.progress_percent,
                start_date: resolution.start_date,
                end_date: resolution.end_date,
                status: resolution.status,
            },
            stats: {
                days_remaining: daysRemaining,
                milestones_total: milestones.length,
                milestones_completed: completedCount,
                milestones_overdue: overdueMilestones.length,
            },
            upcoming_milestone: upcomingMilestone || null,
            last_reflection: lastReflection || null,
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(resolution_entity_1.Resolution)),
    __param(1, (0, typeorm_1.InjectRepository)(milestone_entity_1.Milestone)),
    __param(2, (0, typeorm_1.InjectRepository)(reflection_entity_1.Reflection)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map