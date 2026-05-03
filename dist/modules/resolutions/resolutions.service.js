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
exports.ResolutionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const resolution_entity_1 = require("./entities/resolution.entity");
let ResolutionsService = class ResolutionsService {
    resolutionsRepository;
    constructor(resolutionsRepository) {
        this.resolutionsRepository = resolutionsRepository;
    }
    async create(userId, dto) {
        const resolution = this.resolutionsRepository.create({
            ...dto,
            user_id: userId,
        });
        return this.resolutionsRepository.save(resolution);
    }
    async findAll(userId) {
        return this.resolutionsRepository.find({
            where: { user_id: userId },
            order: { created_at: 'DESC' },
        });
    }
    async findOne(id, userId) {
        const resolution = await this.resolutionsRepository.findOne({
            where: { id },
            relations: ['milestones'],
            order: { milestones: { order_index: 'ASC' } },
        });
        if (!resolution)
            throw new common_1.NotFoundException('Resolution not found');
        if (resolution.user_id !== userId)
            throw new common_1.ForbiddenException('Access denied');
        return resolution;
    }
    async update(id, userId, dto) {
        const resolution = await this.findOne(id, userId);
        Object.assign(resolution, dto);
        return this.resolutionsRepository.save(resolution);
    }
    async delete(id, userId) {
        const resolution = await this.findOne(id, userId);
        await this.resolutionsRepository.delete(resolution.id);
    }
    async recalculateProgress(resolutionId) {
        const resolution = await this.resolutionsRepository.findOne({
            where: { id: resolutionId },
            relations: ['milestones'],
        });
        if (!resolution || !resolution.milestones.length)
            return;
        const total = resolution.milestones.length;
        const completed = resolution.milestones.filter((m) => m.status === 'completed').length;
        const progress_percent = Math.round((completed / total) * 100);
        await this.resolutionsRepository.update(resolutionId, { progress_percent });
    }
};
exports.ResolutionsService = ResolutionsService;
exports.ResolutionsService = ResolutionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(resolution_entity_1.Resolution)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ResolutionsService);
//# sourceMappingURL=resolutions.service.js.map