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
exports.DataEntity = void 0;
const typeorm_1 = require("typeorm");
const sensor_entity_1 = require("./sensor.entity");
let DataEntity = class DataEntity {
};
exports.DataEntity = DataEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DataEntity.prototype, "data_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DataEntity.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DataEntity.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], DataEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sensor_entity_1.SensorEntity, sensor => sensor.data),
    (0, typeorm_1.JoinColumn)({ name: 'sensor_id' }),
    __metadata("design:type", sensor_entity_1.SensorEntity)
], DataEntity.prototype, "sensor", void 0);
exports.DataEntity = DataEntity = __decorate([
    (0, typeorm_1.Entity)('Data')
], DataEntity);
//# sourceMappingURL=data.entity.js.map