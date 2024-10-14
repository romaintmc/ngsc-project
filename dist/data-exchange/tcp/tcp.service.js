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
var TcpService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TcpService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const net = require("net");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const data_entity_1 = require("../../sensor/entity/data.entity");
const sensor_entity_1 = require("../../sensor/entity/sensor.entity");
let TcpService = TcpService_1 = class TcpService {
    constructor(dataRepository, sensorRepository) {
        this.dataRepository = dataRepository;
        this.sensorRepository = sensorRepository;
        this.clients = {};
        this.logger = new common_1.Logger(TcpService_1.name);
    }
    connect(tcpProtocol, sensor) {
        if (this.clients[tcpProtocol.id]) {
            this.logger.warn(`Client with id ${tcpProtocol.id} already exists. list of clients ${this.clients}`);
            return;
        }
        const newSocket = net.createConnection(tcpProtocol.port, tcpProtocol.host);
        newSocket.on('connect', (message) => {
            this.logger.log(`Client ${tcpProtocol.id} connected to server adress ${tcpProtocol.host} and port ${tcpProtocol.port} :`);
        });
        newSocket.on('error', (error) => {
            this.logger.error(`Error in TCP client ${tcpProtocol.id}:`, error);
        });
        newSocket.on('data', (message) => {
            const payload = message.toString();
            this.logger.log(`Message received from server adress ${tcpProtocol.host} and port ${tcpProtocol.port} : ${payload}`);
            const unit = "TCP unit";
            this.sendToDatabase(sensor, +payload, unit);
        });
        newSocket.on('close', () => {
            this.logger.log(`Connection to TCP server ${tcpProtocol.host} and port ${tcpProtocol.port} is closed.`);
        });
        this.clients[tcpProtocol.id] = { socket: newSocket, protocol: tcpProtocol };
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
    sendMessageToAllServers() {
        for (const clientId in this.clients) {
            const { socket, protocol } = this.clients[clientId];
            if (socket) {
                socket.write(protocol.request);
                this.logger.log(`Sent request "${protocol.request}" with client id ${clientId} to server (${protocol.host}:${protocol.port})`);
            }
            else {
                this.logger.warn(`TCP Client with id ${clientId} not found.`);
            }
        }
    }
    sendMessage(tcpProtocol, message) {
        const client = this.clients[tcpProtocol.id].socket;
        if (client) {
            client.write(message);
            this.logger.log(`Sent message to server ${tcpProtocol.host} and port ${tcpProtocol.port}: ${message}`);
        }
        else {
            this.logger.warn(`TCP Client with id ${tcpProtocol.id} not found.`);
        }
    }
};
exports.TcpService = TcpService;
__decorate([
    (0, schedule_1.Cron)('*/5 * * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TcpService.prototype, "sendMessageToAllServers", null);
exports.TcpService = TcpService = TcpService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(data_entity_1.DataEntity)),
    __param(1, (0, typeorm_2.InjectRepository)(sensor_entity_1.SensorEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], TcpService);
//# sourceMappingURL=tcp.service.js.map