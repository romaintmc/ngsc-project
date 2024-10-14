import { Module } from '@nestjs/common';
import { DataExchangeController } from './data-exchange.controller';
import { DataExchangeService } from './data-exchange.service';
import { MqttBrokerService } from './mqtt-broker/mqtt-broker.service';
import { TcpService } from './tcp/tcp.service';
import { ScheduleModule } from '@nestjs/schedule';
import {SensorEntity } from "src/sensor/entity/sensor.entity"
import { DataEntity } from "src/sensor/entity/data.entity"
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports : [ScheduleModule.forRoot(),TypeOrmModule.forFeature([DataEntity,SensorEntity])],
    controllers: [DataExchangeController],
    providers: [DataExchangeService, MqttBrokerService, TcpService],
    exports: [DataExchangeService, MqttBrokerService]
})
export class DataExchangeModule {}

