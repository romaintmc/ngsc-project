import { Repository } from 'typeorm';
import { SensorEntity } from './entity/sensor.entity';
import { Sensor } from './sensor.interface';
import { DataExchangeService } from 'src/data-exchange/data-exchange.service';
export declare class SensorService {
    private readonly sensorRepository;
    private readonly dataExchangeService;
    constructor(sensorRepository: Repository<SensorEntity>, dataExchangeService: DataExchangeService);
    private protocol;
    findAll(): Promise<SensorEntity[]>;
    findOne(id: number): Promise<SensorEntity>;
    findByType(type: string): Promise<SensorEntity[]>;
    findByLocation(location: string): Promise<SensorEntity[]>;
    create(sensor: Sensor, protocol: string): Promise<SensorEntity>;
    getMaxSensorId(): Promise<number>;
    update(id: number, updatedSensor: Partial<Sensor>): Promise<SensorEntity>;
    delete(id: number): Promise<void>;
}
