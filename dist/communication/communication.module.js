"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationModule = void 0;
const common_1 = require("@nestjs/common");
const communication_controller_1 = require("./communication.controller");
const communication_service_1 = require("./communication.service");
const data_exchange_module_1 = require("../data-exchange/data-exchange.module");
const axios_1 = require("@nestjs/axios");
let CommunicationModule = class CommunicationModule {
};
exports.CommunicationModule = CommunicationModule;
exports.CommunicationModule = CommunicationModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule, data_exchange_module_1.DataExchangeModule],
        controllers: [communication_controller_1.CommunicationController],
        providers: [communication_service_1.CommunicationService]
    })
], CommunicationModule);
//# sourceMappingURL=communication.module.js.map