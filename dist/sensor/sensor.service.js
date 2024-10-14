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
exports.SensorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sensor_entity_1 = require("./entity/sensor.entity");
const data_exchange_service_1 = require("../data-exchange/data-exchange.service");
let SensorService = class SensorService {
    constructor(sensorRepository, dataExchangeService) {
        this.sensorRepository = sensorRepository;
        this.dataExchangeService = dataExchangeService;
        this.protocol = [
            {
                "id": 1,
                "name": "Broker Mosquitto",
                "topic": "a",
                "url": "INTERN"
            }
        ];
    }
    async findAll() {
        const sensors = await this.sensorRepository.find({ relations: ['data'] });
        return sensors.map(sensor => ({
            ...sensor,
            data: sensor.data ?? [],
        }));
    }
    async findOne(id) {
        return await this.sensorRepository.findOne({
            where: { sensor_id: id },
            relations: ['data']
        });
    }
    async findByType(type) {
        return await this.sensorRepository.find({
            where: { type: type },
            relations: ['data']
        });
    }
    async findByLocation(location) {
        return await this.sensorRepository.find({
            where: { location: location },
            relations: ['data']
        });
    }
    async create(sensor, protocol) {
        const newSensor = this.sensorRepository.create({
            ...sensor,
            created_at: new Date(),
        });
        const savedSensor = await this.sensorRepository.save(newSensor);
        const maxId = await this.getMaxSensorId();
        sensor.sensor_id = maxId;
        await this.dataExchangeService.addSensor(protocol, sensor);
        return savedSensor;
    }
    async getMaxSensorId() {
        const result = await this.sensorRepository
            .createQueryBuilder('sensor')
            .select('MAX(sensor.sensor_id)', 'max')
            .getRawOne();
        return result.max;
    }
    async update(id, updatedSensor) {
        const sensor = await this.sensorRepository.findOne({ where: { sensor_id: id } });
        if (sensor) {
            const { sensor_id: _, ...sensorData } = updatedSensor;
            await this.sensorRepository.update(id, sensorData);
            return this.sensorRepository.findOne({ where: { sensor_id: id } });
        }
        return null;
    }
    async delete(id) {
        await this.sensorRepository.delete(id);
    }
};
exports.SensorService = SensorService;
exports.SensorService = SensorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sensor_entity_1.SensorEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        data_exchange_service_1.DataExchangeService])
], SensorService);
//# sourceMappingURL=sensor.service.js.map