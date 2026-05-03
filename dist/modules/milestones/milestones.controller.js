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
exports.MilestonesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const milestones_service_1 = require("./milestones.service");
const milestone_dto_1 = require("./dto/milestone.dto");
const user_entity_1 = require("../users/entities/user.entity");
let MilestonesController = class MilestonesController {
    milestonesService;
    constructor(milestonesService) {
        this.milestonesService = milestonesService;
    }
    create(resolutionId, user, dto) {
        return this.milestonesService.create(resolutionId, user.id, dto);
    }
    findAll(resolutionId, user) {
        return this.milestonesService.findAll(resolutionId, user.id);
    }
    update(id, user, dto) {
        return this.milestonesService.update(id, user.id, dto);
    }
    complete(id, user) {
        return this.milestonesService.complete(id, user.id);
    }
    delete(id, user) {
        return this.milestonesService.delete(id, user.id);
    }
};
exports.MilestonesController = MilestonesController;
__decorate([
    (0, common_1.Post)('resolutions/:resolutionId/milestones'),
    __param(0, (0, common_1.Param)('resolutionId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User,
        milestone_dto_1.CreateMilestoneDto]),
    __metadata("design:returntype", void 0)
], MilestonesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('resolutions/:resolutionId/milestones'),
    __param(0, (0, common_1.Param)('resolutionId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], MilestonesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)('milestones/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User,
        milestone_dto_1.UpdateMilestoneDto]),
    __metadata("design:returntype", void 0)
], MilestonesController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('milestones/:id/complete'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], MilestonesController.prototype, "complete", null);
__decorate([
    (0, common_1.Delete)('milestones/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], MilestonesController.prototype, "delete", null);
exports.MilestonesController = MilestonesController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [milestones_service_1.MilestonesService])
], MilestonesController);
//# sourceMappingURL=milestones.controller.js.map