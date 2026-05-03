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
exports.Reflection = exports.ReflectionMood = void 0;
const typeorm_1 = require("typeorm");
const milestone_entity_1 = require("../../milestones/entities/milestone.entity");
const user_entity_1 = require("../../users/entities/user.entity");
var ReflectionMood;
(function (ReflectionMood) {
    ReflectionMood["GREAT"] = "great";
    ReflectionMood["GOOD"] = "good";
    ReflectionMood["OKAY"] = "okay";
    ReflectionMood["STRUGGLING"] = "struggling";
})(ReflectionMood || (exports.ReflectionMood = ReflectionMood = {}));
let Reflection = class Reflection {
    id;
    milestone_id;
    user_id;
    milestone;
    user;
    wins;
    blockers;
    next_steps;
    mood;
    created_at;
};
exports.Reflection = Reflection;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Reflection.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Reflection.prototype, "milestone_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Reflection.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => milestone_entity_1.Milestone, (milestone) => milestone.reflections, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'milestone_id' }),
    __metadata("design:type", milestone_entity_1.Milestone)
], Reflection.prototype, "milestone", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.reflections, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Reflection.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], Reflection.prototype, "wins", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], Reflection.prototype, "blockers", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], Reflection.prototype, "next_steps", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ReflectionMood, nullable: true }),
    __metadata("design:type", String)
], Reflection.prototype, "mood", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Reflection.prototype, "created_at", void 0);
exports.Reflection = Reflection = __decorate([
    (0, typeorm_1.Entity)('reflections')
], Reflection);
//# sourceMappingURL=reflection.entity.js.map