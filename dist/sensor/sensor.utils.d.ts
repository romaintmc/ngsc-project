import { SensorEntity } from './entity/sensor.entity';
export declare class SensorUtils {
    sensorRepository: any;
    constructor();
    getSensorField(field: string): Promise<any>;
    loadSensorAdviceFromExcel(): Promise<void>;
    getAdviceLinks(type: string, value: number): string[];
}
export declare function shuffleArray(array: SensorEntity[]): Promise<any>;
export declare function createHateoasLinks(sensor: SensorEntity): Promise<any>;
export declare function addRandomHateoasLinks(sensor: SensorEntity): Promise<any>;
export declare function addHateoasLinks(sensor: SensorEntity): Promise<any>;
