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
exports.Reminder = exports.ReminderFrequency = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const resolution_entity_1 = require("../../resolutions/entities/resolution.entity");
var ReminderFrequency;
(function (ReminderFrequency) {
    ReminderFrequency["DAILY"] = "daily";
    ReminderFrequency["WEEKLY"] = "weekly";
    ReminderFrequency["MONTHLY"] = "monthly";
})(ReminderFrequency || (exports.ReminderFrequency = ReminderFrequency = {}));
let Reminder = class Reminder {
    id;
    user_id;
    resolution_id;
    user;
    resolution;
    type;
    frequency;
    send_time;
    is_active;
    last_sent_at;
    created_at;
};
exports.Reminder = Reminder;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Reminder.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Reminder.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Reminder.prototype, "resolution_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.reminders, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Reminder.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => resolution_entity_1.Resolution, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'resolution_id' }),
    __metadata("design:type", resolution_entity_1.Resolution)
], Reminder.prototype, "resolution", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'email' }),
    __metadata("design:type", String)
], Reminder.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ReminderFrequency, default: ReminderFrequency.WEEKLY }),
    __metadata("design:type", String)
], Reminder.prototype, "frequency", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', default: '09:00' }),
    __metadata("design:type", String)
], Reminder.prototype, "send_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Reminder.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
    __metadata("design:type", Date)
], Reminder.prototype, "last_sent_at", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Reminder.prototype, "created_at", void 0);
exports.Reminder = Reminder = __decorate([
    (0, typeorm_1.Entity)('reminders')
], Reminder);
//# sourceMappingURL=reminder.entity.js.map