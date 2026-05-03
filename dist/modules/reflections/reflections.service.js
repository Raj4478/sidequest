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
exports.ReflectionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const reflection_entity_1 = require("./entities/reflection.entity");
const milestones_service_1 = require("../milestones/milestones.service");
let ReflectionsService = class ReflectionsService {
    reflectionsRepository;
    milestonesService;
    constructor(reflectionsRepository, milestonesService) {
        this.reflectionsRepository = reflectionsRepository;
        this.milestonesService = milestonesService;
    }
    async create(milestoneId, userId, dto) {
        await this.milestonesService.findOne(milestoneId, userId);
        const reflection = this.reflectionsRepository.create({
            ...dto,
            milestone_id: milestoneId,
            user_id: userId,
        });
        return this.reflectionsRepository.save(reflection);
    }
    async findByMilestone(milestoneId, userId) {
        await this.milestonesService.findOne(milestoneId, userId);
        return this.reflectionsRepository.find({
            where: { milestone_id: milestoneId },
            order: { created_at: 'DESC' },
        });
    }
    async findAllByUser(userId) {
        return this.reflectionsRepository.find({
            where: { user_id: userId },
            relations: ['milestone'],
            order: { created_at: 'DESC' },
        });
    }
    async update(id, userId, dto) {
        const reflection = await this.reflectionsRepository.findOne({ where: { id } });
        if (!reflection)
            throw new common_1.NotFoundException('Reflection not found');
        if (reflection.user_id !== userId)
            throw new common_1.ForbiddenException('Access denied');
        Object.assign(reflection, dto);
        return this.reflectionsRepository.save(reflection);
    }
    async delete(id, userId) {
        const reflection = await this.reflectionsRepository.findOne({ where: { id } });
        if (!reflection)
            throw new common_1.NotFoundException('Reflection not found');
        if (reflection.user_id !== userId)
            throw new common_1.ForbiddenException('Access denied');
        await this.reflectionsRepository.delete(id);
    }
};
exports.ReflectionsService = ReflectionsService;
exports.ReflectionsService = ReflectionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reflection_entity_1.Reflection)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        milestones_service_1.MilestonesService])
], ReflectionsService);
//# sourceMappingURL=reflections.service.js.map