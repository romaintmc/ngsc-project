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
var MqttBrokerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MqttBrokerService = void 0;
const common_1 = require("@nestjs/common");
const mqtt = require("mqtt");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const data_entity_1 = require("../../sensor/entity/data.entity");
const sensor_entity_1 = require("../../sensor/entity/sensor.entity");
let MqttBrokerService = MqttBrokerService_1 = class MqttBrokerService {
    constructor(dataRepository, sensorRepository) {
        this.dataRepository = dataRepository;
        this.sensorRepository = sensorRepository;
        this.brokers = {};
        this.logger = new common_1.Logger(MqttBrokerService_1.name);
    }
    addBroker(mqttProtocol, sensor) {
        if (this.brokers[mqttProtocol.id]) {
            this.logger.warn(`Broker with id ${mqttProtocol.id} already exists, list of brokers ${this.brokers}`);
            return;
        }
        const newClient = mqtt.connect(mqttProtocol.url, mqttProtocol);
        newClient.on('connect', () => {
            this.logger.log(`Connected to broker ${mqttProtocol.id} at ${mqttProtocol.url}`);
        });
        newClient.on('error', (error) => {
            this.logger.error(`Error in broker ${mqttProtocol.id}:`, error);
        });
        this.brokers[mqttProtocol.id] = newClient;
        this.subscribeToTopic(mqttProtocol, sensor);
    }
    subscribeToTopic(mqttProtocol, sensor) {
        const client = this.brokers[mqttProtocol.id];
        if (client) {
            client.subscribe(mqttProtocol.topic, {}, (err) => {
                if (err) {
                    this.logger.error(`Failed to subscribe to topic ${mqttProtocol.topic} on broker ${mqttProtocol.id}`);
                }
                else {
                    this.logger.log(`Subscribed to topic ${mqttProtocol.topic} on broker ${mqttProtocol.id}`);
                }
            });
            client.on('message', (topic, message) => {
                const payload = message.toString();
                this.logger.log(`Message received on topic ${topic}: ${payload}`);
                const unit = "MQTT unit";
                this.sendToDatabase(sensor, +payload, unit);
            });
        }
        else {
            this.logger.warn(`Broker with id ${mqttProtocol.id} not found.`);
        }
    }
    async sendToDatabase(sensor, payload, unit) {
        const sensorEntity = await this.sensorRepository.findOne({ where: { sensor_id: sensor.sensor_id } });
        const newData = this.dataRepository.create({
            value: payload,
            unit: unit,
            sensor: sensorEntity
        });
        await this.dataRepository.save(newData);
    }
    deleteBroker(mqttProtocol) {
        const client = this.brokers[mqttProtocol.id];
        if (client) {
            client.end();
            delete this.brokers[mqttProtocol.id];
            this.logger.log(`Disconnected broker ${mqttProtocol.id}`);
        }
        else {
            this.logger.warn(`Broker with id ${mqttProtocol.id} not found.`);
        }
    }
};
exports.MqttBrokerService = MqttBrokerService;
exports.MqttBrokerService = MqttBrokerService = MqttBrokerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(data_entity_1.DataEntity)),
    __param(1, (0, typeorm_2.InjectRepository)(sensor_entity_1.SensorEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], MqttBrokerService);
//# sourceMappingURL=mqtt-broker.service.js.map