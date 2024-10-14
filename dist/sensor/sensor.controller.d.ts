import { SensorService } from './sensor.service';
import { Sensor } from './sensor.interface';
export declare class SensorController {
    private readonly sensorService;
    constructor(sensorService: SensorService);
    findAll(): Promise<any>;
    findOne(id: string): Promise<Sensor[]>;
    create(body: {
        sensor: Sensor;
        protocol: string;
    }): Promise<any>;
    update(id: string, sensor: Sensor): Promise<any>;
    delete(id: string): Promise<void>;
    findBySensorType(type: string): Promise<any>;
    findByLocationType(location: string): Promise<any>;
}
