"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const sensor_controller_1 = require("./sensor.controller");
const sensor_service_1 = require("./sensor.service");
const data_exchange_module_1 = require("../data-exchange/data-exchange.module");
const axios_1 = require("@nestjs/axios");
const sensor_entity_1 = require("./entity/sensor.entity");
const sensor_utils_1 = require("./sensor.utils");
let SensorModule = class SensorModule {
};
exports.SensorModule = SensorModule;
exports.SensorModule = SensorModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule, data_exchange_module_1.DataExchangeModule, typeorm_1.TypeOrmModule.forFeature([sensor_entity_1.SensorEntity])],
        controllers: [sensor_controller_1.SensorController],
        providers: [sensor_service_1.SensorService, sensor_utils_1.SensorUtils],
    })
], SensorModule);
//# sourceMappingURL=sensor.module.js.map