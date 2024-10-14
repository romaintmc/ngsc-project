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
exports.DataExchangeController = void 0;
const common_1 = require("@nestjs/common");
const data_exchange_service_1 = require("./data-exchange.service");
let DataExchangeController = class DataExchangeController {
    constructor(dataExchangeService) {
        this.dataExchangeService = dataExchangeService;
    }
    addSensor(body) {
        const { protocol, sensor } = body;
        this.dataExchangeService.addSensor(protocol, sensor);
        return `Added ${sensor.sensor_id},${sensor.name} with protocol ${protocol}.`;
    }
};
exports.DataExchangeController = DataExchangeController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DataExchangeController.prototype, "addSensor", null);
exports.DataExchangeController = DataExchangeController = __decorate([
    (0, common_1.Controller)('data-exchange'),
    __metadata("design:paramtypes", [data_exchange_service_1.DataExchangeService])
], DataExchangeController);
//# sourceMappingURL=data-exchange.controller.js.map