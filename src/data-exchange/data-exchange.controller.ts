import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import * as Interface from 'src/sensor/sensor.interface';
import { DataExchangeService } from './data-exchange.service';


@Controller('data-exchange')
export class DataExchangeController {
  constructor(private readonly dataExchangeService: DataExchangeService) {}
  @Post()
  addSensor(@Body() body: { protocol: string, sensor: Interface.Sensor }) {
    const { protocol, sensor } = body;
    this.dataExchangeService.addSensor(protocol, sensor);
    return `Added ${sensor.sensor_id},${sensor.name} with protocol ${protocol}.`;
  }
}



