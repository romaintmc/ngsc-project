import { Controller, Get, Param, Body, Post, Put, Delete } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { Sensor } from './sensor.interface';
import { addHateoasLinks } from './sensor.utils';
import { DataEntity } from './entity/data.entity';
import { SensorEntity } from './entity/sensor.entity';


@Controller('sensors')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @Get()
  async findAll(): Promise<any> {
    const sensors = await this.sensorService.findAll();
    const sensorsWithLinks = await Promise.all(sensors.map(sensor => addHateoasLinks(sensor)));
    return sensorsWithLinks;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Sensor[]> {
    const sensor = await this.sensorService.findOne(Number(id));
    return sensor ? addHateoasLinks(sensor) : null;
  }

  @Post()
  async create(@Body() body: { sensor: Sensor; protocol: string }): Promise<any> {
    const { sensor, protocol } = body;
    const createdSensor = await this.sensorService.create(sensor, protocol);
    return createdSensor;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() sensor: Sensor): Promise<any> {
    const updatedSensor = await this.sensorService.update(Number(id), sensor);
    return updatedSensor;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.sensorService.delete(Number(id));
  }

  @Get('type/:type')
  async findBySensorType(@Param('type') type: string): Promise<any> {
    const sensors = await this.sensorService.findByType(type);
    return sensors.map(sensor => addHateoasLinks(sensor));
  }

  @Get('location/:location')
  async findByLocationType(@Param('location') location: string): Promise <any> {
    const sensors = await this.sensorService.findByLocation(location);
    return sensors.map(sensor => addHateoasLinks(sensor));
  }
}
