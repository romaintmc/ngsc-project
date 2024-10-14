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
exports.CommunicationService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let CommunicationService = class CommunicationService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getDataFromPi2() {
        try {
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.get('http://10.180.150.76:3000/sensors'));
            return response.data;
        }
        catch (error) {
            console.error('Error fetching sensor data:', error.message);
            throw this.handleError(error);
        }
    }
    handleError(error) {
        if (error.response) {
            console.error('Error response:', error.response.data);
            console.error('Error status:', error.response.status);
            console.error('Error headers:', error.response.headers);
            throw new common_1.HttpException(error.response?.data, error.response?.status);
        }
        else if (error.request) {
            console.error('Error request:', error.request);
            throw new common_1.HttpException('Failed to send request', common_1.HttpStatus.REQUEST_TIMEOUT);
        }
        else {
            console.error('Error message:', error.message);
            throw new common_1.HttpException('Failed to send request', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.CommunicationService = CommunicationService;
exports.CommunicationService = CommunicationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], CommunicationService);
//# sourceMappingURL=communication.service.js.map