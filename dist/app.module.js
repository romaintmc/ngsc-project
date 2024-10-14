"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const sensor_module_1 = require("./sensor/sensor.module");
const communication_module_1 = require("./communication/communication.module");
const data_exchange_module_1 = require("./data-exchange/data-exchange.module");
const axios_1 = require("@nestjs/axios");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const sensor_entity_1 = require("./sensor/entity/sensor.entity");
const data_entity_1 = require("./sensor/entity/data.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sensor_module_1.SensorModule,
            data_exchange_module_1.DataExchangeModule,
            axios_1.HttpModule,
            communication_module_1.CommunicationModule,
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'mysql',
                    host: configService.get('DB_HOST'),
                    port: +configService.get('DB_PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_NAME'),
                    entities: [sensor_entity_1.SensorEntity, data_entity_1.DataEntity],
                    cache: false,
                    synchronize: false,
                }),
                inject: [config_1.ConfigService]
            }),
            typeorm_1.TypeOrmModule.forFeature([sensor_entity_1.SensorEntity, data_entity_1.DataEntity]),
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map