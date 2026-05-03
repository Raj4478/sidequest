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
exports.ReflectionsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const reflections_service_1 = require("./reflections.service");
const reflection_dto_1 = require("./dto/reflection.dto");
const user_entity_1 = require("../users/entities/user.entity");
let ReflectionsController = class ReflectionsController {
    reflectionsService;
    constructor(reflectionsService) {
        this.reflectionsService = reflectionsService;
    }
    create(milestoneId, user, dto) {
        return this.reflectionsService.create(milestoneId, user.id, dto);
    }
    findByMilestone(milestoneId, user) {
        return this.reflectionsService.findByMilestone(milestoneId, user.id);
    }
    findAll(user) {
        return this.reflectionsService.findAllByUser(user.id);
    }
    update(id, user, dto) {
        return this.reflectionsService.update(id, user.id, dto);
    }
    delete(id, user) {
        return this.reflectionsService.delete(id, user.id);
    }
};
exports.ReflectionsController = ReflectionsController;
__decorate([
    (0, common_1.Post)('milestones/:milestoneId/reflections'),
    __param(0, (0, common_1.Param)('milestoneId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User,
        reflection_dto_1.CreateReflectionDto]),
    __metadata("design:returntype", void 0)
], ReflectionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('milestones/:milestoneId/reflections'),
    __param(0, (0, common_1.Param)('milestoneId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], ReflectionsController.prototype, "findByMilestone", null);
__decorate([
    (0, common_1.Get)('reflections'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], ReflectionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)('reflections/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User,
        reflection_dto_1.UpdateReflectionDto]),
    __metadata("design:returntype", void 0)
], ReflectionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('reflections/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], ReflectionsController.prototype, "delete", null);
exports.ReflectionsController = ReflectionsController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [reflections_service_1.ReflectionsService])
], ReflectionsController);
//# sourceMappingURL=reflections.controller.js.map