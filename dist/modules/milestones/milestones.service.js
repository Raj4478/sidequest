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
exports.MilestonesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const milestone_entity_1 = require("./entities/milestone.entity");
const resolutions_service_1 = require("../resolutions/resolutions.service");
let MilestonesService = class MilestonesService {
    milestonesRepository;
    resolutionsService;
    constructor(milestonesRepository, resolutionsService) {
        this.milestonesRepository = milestonesRepository;
        this.resolutionsService = resolutionsService;
    }
    async create(resolutionId, userId, dto) {
        await this.resolutionsService.findOne(resolutionId, userId);
        const milestone = this.milestonesRepository.create({
            ...dto,
            resolution_id: resolutionId,
        });
        return this.milestonesRepository.save(milestone);
    }
    async findAll(resolutionId, userId) {
        await this.resolutionsService.findOne(resolutionId, userId);
        return this.milestonesRepository.find({
            where: { resolution_id: resolutionId },
            order: { order_index: 'ASC' },
        });
    }
    async findOne(id, userId) {
        const milestone = await this.milestonesRepository.findOne({
            where: { id },
            relations: ['resolution'],
        });
        if (!milestone)
            throw new common_1.NotFoundException('Milestone not found');
        if (milestone.resolution.user_id !== userId)
            throw new common_1.ForbiddenException('Access denied');
        return milestone;
    }
    async update(id, userId, dto) {
        const milestone = await this.findOne(id, userId);
        Object.assign(milestone, dto);
        return this.milestonesRepository.save(milestone);
    }
    async complete(id, userId) {
        const milestone = await this.findOne(id, userId);
        milestone.status = milestone_entity_1.MilestoneStatus.COMPLETED;
        milestone.completed_at = new Date();
        const saved = await this.milestonesRepository.save(milestone);
        await this.resolutionsService.recalculateProgress(milestone.resolution_id);
        return saved;
    }
    async delete(id, userId) {
        const milestone = await this.findOne(id, userId);
        await this.milestonesRepository.delete(milestone.id);
        await this.resolutionsService.recalculateProgress(milestone.resolution_id);
    }
};
exports.MilestonesService = MilestonesService;
exports.MilestonesService = MilestonesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(milestone_entity_1.Milestone)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        resolutions_service_1.ResolutionsService])
], MilestonesService);
//# sourceMappingURL=milestones.service.js.map