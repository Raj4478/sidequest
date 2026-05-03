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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resolution = exports.ResolutionStatus = exports.ResolutionCategory = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const milestone_entity_1 = require("../../milestones/entities/milestone.entity");
var ResolutionCategory;
(function (ResolutionCategory) {
    ResolutionCategory["HEALTH"] = "health";
    ResolutionCategory["CAREER"] = "career";
    ResolutionCategory["EDUCATION"] = "education";
    ResolutionCategory["FINANCE"] = "finance";
    ResolutionCategory["PERSONAL"] = "personal";
    ResolutionCategory["OTHER"] = "other";
})(ResolutionCategory || (exports.ResolutionCategory = ResolutionCategory = {}));
var ResolutionStatus;
(function (ResolutionStatus) {
    ResolutionStatus["ACTIVE"] = "active";
    ResolutionStatus["COMPLETED"] = "completed";
    ResolutionStatus["ABANDONED"] = "abandoned";
})(ResolutionStatus || (exports.ResolutionStatus = ResolutionStatus = {}));
let Resolution = class Resolution {
    id;
    user_id;
    user;
    title;
    description;
    category;
    start_date;
    end_date;
    progress_percent;
    status;
    milestones;
    created_at;
    updated_at;
};
exports.Resolution = Resolution;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Resolution.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Resolution.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.resolutions, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Resolution.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Resolution.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], Resolution.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ResolutionCategory }),
    __metadata("design:type", String)
], Resolution.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], Resolution.prototype, "start_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], Resolution.prototype, "end_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Resolution.prototype, "progress_percent", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ResolutionStatus, default: ResolutionStatus.ACTIVE }),
    __metadata("design:type", String)
], Resolution.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => milestone_entity_1.Milestone, (milestone) => milestone.resolution),
    __metadata("design:type", Array)
], Resolution.prototype, "milestones", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Resolution.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Resolution.prototype, "updated_at", void 0);
exports.Resolution = Resolution = __decorate([
    (0, typeorm_1.Entity)('resolutions')
], Resolution);
//# sourceMappingURL=resolution.entity.js.map