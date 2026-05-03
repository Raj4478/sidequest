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
exports.Milestone = exports.MilestoneStatus = void 0;
const typeorm_1 = require("typeorm");
const resolution_entity_1 = require("../../resolutions/entities/resolution.entity");
const reflection_entity_1 = require("../../reflections/entities/reflection.entity");
var MilestoneStatus;
(function (MilestoneStatus) {
    MilestoneStatus["PENDING"] = "pending";
    MilestoneStatus["COMPLETED"] = "completed";
    MilestoneStatus["SKIPPED"] = "skipped";
    MilestoneStatus["OVERDUE"] = "overdue";
})(MilestoneStatus || (exports.MilestoneStatus = MilestoneStatus = {}));
let Milestone = class Milestone {
    id;
    resolution_id;
    resolution;
    title;
    description;
    due_date;
    status;
    order_index;
    completed_at;
    reflections;
    created_at;
};
exports.Milestone = Milestone;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Milestone.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Milestone.prototype, "resolution_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => resolution_entity_1.Resolution, (resolution) => resolution.milestones, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'resolution_id' }),
    __metadata("design:type", resolution_entity_1.Resolution)
], Milestone.prototype, "resolution", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Milestone.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], Milestone.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], Milestone.prototype, "due_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: MilestoneStatus, default: MilestoneStatus.PENDING }),
    __metadata("design:type", String)
], Milestone.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Milestone.prototype, "order_index", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
    __metadata("design:type", Date)
], Milestone.prototype, "completed_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reflection_entity_1.Reflection, (reflection) => reflection.milestone),
    __metadata("design:type", Array)
], Milestone.prototype, "reflections", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Milestone.prototype, "created_at", void 0);
exports.Milestone = Milestone = __decorate([
    (0, typeorm_1.Entity)('milestones')
], Milestone);
//# sourceMappingURL=milestone.entity.js.map