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
exports.DataExchangeService = void 0;
const mqtt_broker_service_1 = require("./mqtt-broker/mqtt-broker.service");
const tcp_service_1 = require("./tcp/tcp.service");
const fs = require("fs");
const common_1 = require("@nestjs/common");
let DataExchangeService = class DataExchangeService {
    constructor(mqttBrokerService, tcpService) {
        this.mqttBrokerService = mqttBrokerService;
        this.tcpService = tcpService;
        this.sensors = {};
    }
    addSensor(protocol, sensor) {
        if (protocol == "mqtt") {
            if (this.sensors[sensor.sensor_id]) {
                return "Sensor already added";
            }
            else {
                const config = this.getConfig("src/data-exchange/mqtt-config.json");
                this.mqttBrokerService.addBroker(config, sensor);
                this.sensors[sensor.sensor_id] = { sensor: sensor, protocol: protocol };
            }
        }
        if (protocol == "tcp") {
            if (this.sensors[sensor.sensor_id]) {
                return "Sensor already added";
            }
            else {
                const config = this.getConfig("src/data-exchange/tcp-config.json");
                this.tcpService.connect(config, sensor);
                this.tcpService.sendMessage(config, config.request);
                this.sensors[sensor.sensor_id] = { sensor: sensor, protocol: protocol };
            }
        }
    }
    getConfig(path) {
        try {
            const fileContent = fs.readFileSync(path, 'utf8');
            const config = JSON.parse(fileContent);
            return config;
        }
        catch (err) {
            console.error('Error reading config file:', err);
            return {};
        }
    }
};
exports.DataExchangeService = DataExchangeService;
exports.DataExchangeService = DataExchangeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mqtt_broker_service_1.MqttBrokerService,
        tcp_service_1.TcpService])
], DataExchangeService);
//# sourceMappingURL=data-exchange.service.js.map