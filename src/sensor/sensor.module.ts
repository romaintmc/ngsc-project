import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorController } from './sensor.controller';
import { SensorService } from './sensor.service';
import { DataExchangeModule } from 'src/data-exchange/data-exchange.module';
import { HttpModule } from '@nestjs/axios';
import { SensorEntity } from './entity/sensor.entity';
import {DataEntity} from "src/sensor/entity/data.entity";
import { SensorUtils } from './sensor.utils'

@Module({ 
  imports: [HttpModule, DataExchangeModule, TypeOrmModule.forFeature([SensorEntity])],
  controllers: [SensorController],
  providers: [SensorService, SensorUtils],
})
export class SensorModule {}













